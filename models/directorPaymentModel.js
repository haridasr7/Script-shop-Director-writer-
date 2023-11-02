const mongoose = require("mongoose");

const directorPaymentSchema = new mongoose.Schema({
  directorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Make sure "User" matches the model name of the User model
    required: false,
  },
  scriptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publish", // Make sure "User" matches the model name of the User model
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // card: {
  //   number: {
  //     type: String,
  //     unique: true,
  //     required: function () {
  //       return this.paymentMethod === "card";
  //     },
  //   },
  //   expiryDate: {
  //     type: String,
  //     required: function () {
  //       return this.paymentMethod === "card";
  //     },
  //   },
  //   cvv: {
  //     type: String,
  //     required: function () {
  //       return this.paymentMethod === "card";
  //     },
  //   },
  // },
  // upiId: {
  //   type: String,
  //   unique: true,
  //   required: function () {
  //     return this.paymentMethod === "upi";
  //   },
  // },
  order_id: {
    type: String,
    required: false,
  },
});

const DirectorPaymentModel = mongoose.model("DirectorPayment", directorPaymentSchema);

module.exports = DirectorPaymentModel;
