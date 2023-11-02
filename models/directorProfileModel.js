const mongoose = require("mongoose");
const validator = require("validator");

const directorProfileSchema = new mongoose.Schema({
  directorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Make sure "User" matches the model name of the User model
    required: false,
  },
  profilePic: {
    type: String,
    default: null,
    required: false,
  },
  name: {
    type: String,
    required: true,
    unique: true, // Enforce uniqueness for the name field
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
      message: "Name should contain only alphabetic characters.",
    },
  },
  bio: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return (
          !validator.isEmpty(value) &&
          !validator.isNumeric(value) &&
          !validator.isAlphanumeric(value)
        );
      },
      message:
        "Bio should contain alphabetic characters and may include spaces.",
    },
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true, // Enforce uniqueness for the businessEmail field
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@(gmail|yahoo)\.[A-Za-z]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format. Please use the example@gmail.com format.",
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // Enforce uniqueness for the phoneNumber field
    validate: {
      validator: function (value) {
        return /^(?!0{10}$)\d{10}$/.test(value);
      },
      message:
        "Invalid phone number. Phone number should not contain only zeros and should be 10 digits in length.",
    },
  },
});

const DirectorProfile = mongoose.model(
  "DirectorProfile",
  directorProfileSchema
);

module.exports = DirectorProfile;
