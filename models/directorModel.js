const mongoose = require("mongoose");
const validator = require("validator");


const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
      message: "Name should contain only alphabetic characters.",
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
  }
});

module.exports = mongoose.model("Director", directorSchema);
