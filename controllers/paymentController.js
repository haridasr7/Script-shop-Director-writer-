const catchAsyncError = require("../middlewares/catchAsyncError");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const PaymentModel = require("../models/PaymentModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");
const Publish = require("../models/publishModel");
// Maintain a Set to store the used card details
const usedCards = new Set();
// Function to validate the card number
function validateCardNumber(cardNumber) {
  const cardNumberRegex = /^[0-9]{16}$/; // Regex pattern for 16 digits
  return cardNumberRegex.test(cardNumber);
}
// Function to validate the expiry date
function validateExpiryDate(expiryDate) {
  // Validate the expiry date format (MM/YY)
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/; // Format: MM/YY
  if (!expiryDateRegex.test(expiryDate)) {
    return false;
  }
  // Extract month and year from the expiry date
  const [month, year] = expiryDate.split("/").map((part) => parseInt(part, 10));
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1; // Note: JavaScript months are 0-based
  // Validate month
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }
  return true;
}
// Function to validate the CVC
function validateCVC(cvc) {
  const cvcRegex = /^(?!000)[0-9]{3}$/; // Regex pattern for 3 digits excluding "000"
  return cvcRegex.test(cvc);
}
// Function to validate the UPI ID
function validateUpiId(upiId) {
  const upiIdRegex = /^[a-z0-9][a-z0-9._-]{1,43}[a-z0-9]@[a-zA-Z0-9]+$/;
  return upiIdRegex.test(upiId);
}
// Razorpay UPI Payment
exports.processPayment = catchAsyncError(async (req, res, next) => {
  // console.log(req.body)
  const { amount, paymentMethod } = req.body;
  const { writerId } = req.query;
  // console.log(writerId);
  // const paymentAmountLimitForCard = 50000; // Set your desired amount limit
  // const paymentAmountLimitForUpi = 100000; // Set the maximum amount for UPI payment
  // Generate a unique order ID
  const order_id = shortid.generate();
  // console.log(order_id);
  // Store the payment details
  const storedData = await PaymentModel.create({
    writerId,
    order_id,
    amount,
    paymentMethod,
  });
  // Save the payment details in the database
  // await storedData.save();
  // console.log("stepstoreddatasave")
  // if (paymentMethod === "card" && amount > paymentAmountLimitForCard) {
  //   return res.status(400).json({ error: "Payment amount exceeds the limit" });
  // }
  // // Check if payment method is either "card" or "upi"
  // if (paymentMethod !== "card" && paymentMethod !== "upi") {
  //   return res.status(400).json({ error: "Invalid payment method" });
  // }
  // if (paymentMethod === "card") {
  //   // If payment method is "card", validate the card details
  //   const { number: cardNumber, expiryDate, cvv } = card;
  //   if (!validateCardNumber(cardNumber)) {
  //     return res.status(400).json({ error: "Invalid card number" });
  //   }
  //   if (!validateExpiryDate(expiryDate)) {
  //     return res.status(400).json({ error: "Invalid expiry date" });
  //   }
  //   if (!validateCVC(cvv)) {
  //     return res.status(400).json({ error: "Invalid CVV" });
  //   }
  //   // Check if the card has already been used with different expiration details
  //   if (usedCards.has(cardNumber)) {
  //     return res
  //       .status(400)
  //       .json({ error: "Card already used with different expiration details" });
  //   }
  //   // Add the current card details to the used cards set
  //   usedCards.add(cardNumber);
  // } else if (paymentMethod === "upi") {
  //   // If payment method is "upi", validate the UPI ID
  //   if (!upiId) {
  //     return res.status(400).json({ error: "UPI ID is required" });
  //   }
  //   if (!validateUpiId(upiId)) {
  //     return res.status(400).json({ error: "Invalid UPI ID" });
  //   }
  //   // Additional validation for UPI payment can be added here if needed
  //   if (amount > paymentAmountLimitForUpi) {
  //     return res
  //       .status(400)
  //       .json({ error: "UPI payment amount exceeds the limit" });
  //   }
  // }
  // Razorpay Payment
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  // console.log(options)
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      order_id: order_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});
exports.verification = catchAsyncError(async (req, res, next) => {
  const { order_id, amount, paymentMethod } = req.body;
  const { writerId } = req.query;
  // Convert directorId from string to ObjectId
  let writerObjectId;
  try {
    writerObjectId = ObjectId(writerId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid writerId format" });
  }
  // Retrieve the stored payment details using the order ID
  const storedData = await PaymentModel.findOne({ order_id: order_id });
  // Check if the stored payment data exists
  if (!storedData) {
    return res
      .status(400)
      .json({ success: false, message: "Payment data not found" });
  }
  // Compare the stored payment data with the data in the verification request
  // if (
  //   amount !== storedData.amount ||
  //   paymentMethod !== storedData.paymentMethod ||
  //   (card && card.number !== storedData.card.number) ||
  //   (card && card.expiryDate !== storedData.card.expiryDate) ||
  //   (card && card.cvv !== storedData.card.cvv) ||
  //   upiId !== storedData.upiId ||
  //   writerObjectId.toString() !== storedData.writerId.toString()
  // ) {
  //   return res.status(400).json({ error: "Invalid payment data" });
  // }
  // Check if payment method is "card"
  // if (paymentMethod === "card") {
  //   // If payment method is "card", validate the card details
  //   const { number: cardNumber, expiryDate, cvv } = card;
  //   if (!validateCardNumber(cardNumber)) {
  //     return res.status(400).json({ error: "Invalid card number" });
  //   }
  //   if (!validateExpiryDate(expiryDate)) {
  //     return res.status(400).json({ error: "Invalid expiry date" });
  //   }
  //   if (!validateCVC(cvv)) {
  //     return res.status(400).json({ error: "Invalid CVV" });
  //   }
  //   // Check if amount exceeds the limit for "card" payment method
  //   if (paymentMethod === "card" && amount > 50000) {
  //     return res
  //       .status(400)
  //       .json({ error: "Payment amount exceeds the limit" });
  //   }
  //   // Perform additional verification logic for UPI payment
  //   if (paymentMethod === "upi") {
  //     // Check if UPI ID matches
  //     if (storedData.upiId !== upiId) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "Invalid UPI ID" });
  //     }
  //   }
  // }
  const secret = "12345678";
  // console.log(req.body);
  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  console.log(digest, req.headers["x-razorpay-signature"]);
  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

// Function to process payments and store information
exports.writerprocessPayment = async (req, res) => {
  try {
    const { writerId, movieName, amount, paymentMethod } = req.body;

    // Generate a unique order ID
    const order_id = shortid.generate();

    // Create a new payment document in MongoDB
    const paymentData = new PaymentModel({
      writerId: ObjectId(writerId), // Convert writerId to ObjectId
      movieName,
      amount,
      paymentMethod,
      order_id,
    });

    // Save the payment data to MongoDB
    await paymentData.save();

    // Set up Razorpay payment options
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const payment_capture = 1;
  const currency = "INR";

    const paymentOptions = {
      amount: amount * 100, // Amount in paise (Indian currency)
      currency: 'INR',
      receipt: shortid.generate(),
      payment_capture,
    };
   
    // Create a Razorpay order
    const razorpayResponse = await razorpay.orders.create(paymentOptions);

    res.json({
      id: razorpayResponse.id,
      order_id: order_id,
      currency: razorpayResponse.currency,
      amount: razorpayResponse.amount,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

// Function to verify writer payments
exports.verifyWriterPayment = async (req, res) => {
  try {
    const { order_id, amount, paymentMethod, writerId, movieName } = req.body;
    console.log(req.body);

    // Retrieve the stored payment details using the order ID and writer ID
    const storedData = await PaymentModel.findOne({
      order_id: order_id,
      writerId: writerId,
      movieName,
    });

    if (!storedData) {
      return res.status(400).json({ success: false, message: 'Payment data not found' });
    }

    // Update the ispaid field in the Publish collection
    const publishedOne = await Publish.findOne({ movieName });
    if (publishedOne) {
      publishedOne.ispaid = true;
      await publishedOne.save();
    } else {
      return res.status(400).json({ success: false, message: 'Movie not found' });
    }

    // If the payment is valid, you can perform additional actions or mark it as verified
    // ...

    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

