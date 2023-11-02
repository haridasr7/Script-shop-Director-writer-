const Admin = require('../models/AdminloginModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config();
const catchAsyncError = require("../../middlewares/catchAsyncError");

const JWT_SECRET = process.env.JWT_SECRET; // Corrected the placement of JWT_SECRET

// Admin login route
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await admin.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Passwords match; admin is logged in
        const expiresIn = 24 * 3600; // 1 day (in seconds)
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn });

        return res
            .status(200)
            .json({ message: 'Admin logged in successfully', token, expiresIn });
    } catch (err) {
        console.error('Error finding or comparing passwords:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Forgot password route
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return next(new ErrorHandler("Admin not found", 404));
        }

        // Generate a password reset token
        admin.generatePasswordResetToken();
        await admin.save({ validateBeforeSave: false });

        // Construct the password reset URL
        let BASE_URL = process.env.FRONTEND_URL;
       
        const resetToken = admin.resetPasswordToken;
        const resetUrl = `${BASE_URL} ` ;

        // Compose the email message
        const message = `Use this link to reset your password: ${resetUrl}\n\n 
        and Reset token : ${resetToken} 
        If you have not requested this email, then ignore it.`;

        // Send the email using the sendEmail function
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: message, // Use the constructed message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return next(new ErrorHandler("Error sending email", 500)); // Use the error handler
            } else {
                console.log("Email sent:", info.response);
                res.status(200).json({ success: "Password reset email sent successfully!" });
            }
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return next(new ErrorHandler("Server error", 500)); // Use the error handler
    }
});

// ... Rest of the code for resetPassword and registerAdmin routes

// Reset password route
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    

    try {
        const admin = await Admin.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpire: { $gt: Date.now() },
        });

        if (!admin) {
            return res
                .status(400)
                .json({ message: 'Invalid or expired reset token' });
        }

        // Update the admin's password
        admin.password = newPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordTokenExpire = undefined;

        await admin.save();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error while processing reset password request:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if an admin with the same username or email already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with the same username or email already exists' });
        }

        // Create a new admin user
        const admin = new Admin({ username, email, password });

        // Hash the password before saving
        await admin.save();

        return res.status(201).json({ message: 'Admin registration successful' });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
















exports.logoutAdmin = (req, res, next) => {
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

  