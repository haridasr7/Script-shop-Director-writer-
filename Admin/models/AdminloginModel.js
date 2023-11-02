const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
  username: {
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
    maxlength: [10, "Password should have a maximum length of 10 characters"],
    validate: {
      validator: function (value) {
        const validPasswordRegex =
          /^(?!^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$)(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/;
        return validPasswordRegex.test(value);
      },
      message:
        "Invalid password. Password should contain alphabets, numbers, and symbols, but not zeros or symbols alone, and password length should be between 6 and 10 characters.",
    },
  },
  
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
});

// Hash password before saving to the database
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and store a password reset token
adminSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = resetToken;
  this.resetPasswordTokenExpire = Date.now() + 3600000; // Token expires in 1 hour
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
