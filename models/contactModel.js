const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
      message: "First Name should contain only alphabetic characters.",
    },
  },
  email: {
    type: String,
    required: true,
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
    validate: {
      validator: function (value) {
        return /^(?!0{10}$)\d{10}$/.test(value);
      },
      message:
        "Invalid phone number. Phone number should not contain only zeros and should be 10 digits in length.",
    },
  },
  subject: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return (
          !validator.isEmpty(value) &&
          (validator.isAlpha(value.replace(/\s/g, "")) ||
            validator.isAlphanumeric(value))
        );
      },
      message:
        "Subject should contain alphabetic characters and may include spaces.",
    },
  },
  text: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return !validator.isEmpty(value) && !validator.isNumeric(value);
      },
      message:
        "Text should contain alphabetic characters and may include spaces.",
    },
  },
  readMessage: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
