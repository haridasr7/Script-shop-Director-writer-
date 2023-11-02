const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.Mixed,
    enum: ["writer", "director", "director and writer"],
    required: true,
  },
  userName: {
    type: String,
    required: [true, "Please enter user name"],
    validate: {
      validator: function (value) {
        const symbolRegex = /^(?![0-9_@!$%#]+$)[a-zA-Z0-9_@!$%#]+$/; // Regular expression to allow alphanumeric characters, underscores, @, !, $, %, and # but not symbols alone
        return symbolRegex.test(value);
      },
      message:
        "Invalid userName. Only alphanumeric characters, underscores, @, !, $, %, and # are allowed, but not symbols alone.",
    },

  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate email format
        const emailRegex =
          /^(?![0-9_@!$%#]+$)[a-zA-Z][a-zA-Z0-9_.@!$%#]*@(gmail|yahoo)\.[a-zA-Z]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password should have a minimum length of 6 characters"],
    maxlength: [6, "Password should have a maximum length of 6 characters"],
    validate: {
      validator: function (value) {
        const validPasswordRegex =
          /^(?!^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$)(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6}$/;
        return validPasswordRegex.test(value);
      },
      message:
        "Invalid password. Password should contain alphabets, numbers, and symbols, but not zeros or symbols alone and password length should only be six characters.",
    },
  },

  blocked: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  // Favorites field to store script IDs
  favoriteScripts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publish", // Replace with the actual name of your Script model
    },
  ],

  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  //before userschema excecute.
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  //to store in cookies for maintain user logged in
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.methods.isValidPassword = async function (enteredPassword) {
  //login time
  return bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getResetToken = function () {
  //Generate Token
  const token = crypto.randomBytes(20).toString("hex");
  //Generate Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  //Set token expire time
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
  return token;
};

let model = mongoose.model("User", userSchema); //it creates users collection in mongodb
module.exports = model;
