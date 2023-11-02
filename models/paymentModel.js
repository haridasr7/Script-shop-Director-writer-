const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Make sure "User" matches the model name of the User model
    required: false,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  
  order_id: {
    type: String,
    required: false,
  },
});
const PaymentModel = mongoose.model("Payment", paymentSchema);
module.exports = PaymentModel;
