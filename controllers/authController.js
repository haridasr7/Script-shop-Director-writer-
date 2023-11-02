const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require("crypto");
const validator = require("validator");

//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { role, userName, email, password, confirmPassword } = req.body;
  if (!role || !userName || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters long" });
  }
  // Check if username is a number
  if (!isNaN(userName)) {
    return res.status(400).json({ error: "Username cannot be a number" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password.length !== 6) {
    return res
      .status(400)
      .json({ error: "Password should be exactly 6 characters long" });
  }
  const user = await User.create({
    role: Array.isArray(role) ? role : [role], // Ensure roles is an array
    userName,
    email,
    password,
    confirmPassword,
  });

  sendToken(user, 201, res);
});

// Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  try {
    const { role, emailOrUserName, password } = req.body;

    if (!role || !emailOrUserName || !password) {
      return next(
        new ErrorHandler("Please enter role, email/username & password", 400)
      );
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUserName }, { userName: emailOrUserName }],
    }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid role, email/username, or password." });
    }

    // Check if the user has the specified role
    if (!user.role.includes(role)) {
      return res.status(401).json({ success: false, message: "Invalid role" });
    }

    // Check if the user is blocked
    if (user.blocked) {
      return res.status(401).json({ success: false, message: "User is blocked. Please contact support." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }
    if (!(await user.isValidPassword(password))) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Include redirect URL based on role in the response
    let redirectUrl;
    if (role === "director") {
      redirectUrl = "/director-page";
      // Remove unnecessary data for writer role
      user.writerData = undefined;
    } else if (role === "writer") {
      redirectUrl = "/writer-page";
      // Remove unnecessary data for director role
      user.directorData = undefined;
    }

    // If the user has both roles, decide which data to include in the response
    if (user.role.includes("writer") && user.role.includes("director")) {
      if (role === "writer") {
        user.directorData = undefined;
      } else if (role === "director") {
        user.writerData = undefined;
      }
    }

    sendToken(user, 201, res);

    // Include the updated user data in the response
    return res.status(200).json({
      success: true,
      redirectUrl,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});



//Logout - /api/v1/logout
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
};

// Update Profile - /api/v1/update/:id
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.params.userId; // Access the user ID from the URL parameters

  let newUserData = {
    userName: req.body.userName,
    email: req.body.email,
  };

  // Add email validation
  if (newUserData.email) {
    if (!validator.isEmail(newUserData.email)) {
      return next(new ErrorHandler("Invalid email format", 400));
    }
  }

  const user = await User.findByIdAndUpdate(userId, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});


//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  let BASE_URL = process.env.FRONTEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  //Create reset url
  const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "Script Shop Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500);
  }
});

// Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return next(new ErrorHandler("Password reset token is invalid or expired"));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    // Handle any errors that occur during password change
    return next(new ErrorHandler("Error changing password", 500));
  }
});

// Change Password - PUT /api/v1/password/change/:userId
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const userId = req.params.userId;
  const { oldPassword, password } = req.body;

  // Logic to change the password for the user with the provided user ID
  try {
    const user = await User.findById(userId).select("+password");

    // Check if the old password matches
    if (!(await user.isValidPassword(oldPassword))) {
      return next(new ErrorHandler("Old password is incorrect", 401));
    }

    // Validate the new password
    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,}$/.test(
        password
      )
    ) {
      return next(new ErrorHandler("Invalid password format", 400));
    }
    // Update the password
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    // Handle any errors that occur during password change
    return next(new ErrorHandler("Error changing password", 500));
  }
});
