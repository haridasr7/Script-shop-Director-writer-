const catchAsyncError = require("../middlewares/catchAsyncError");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const DirectorPayment = require("../models/directorPaymentModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");
const Publish = require("../models/publishModel");
const DirectorProfile = require("../models/directorProfileModel");
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
exports.directorprocessPayment = catchAsyncError(async (req, res, next) => {
  const { amount, paymentMethod } = req.body;
  const { directorId } = req.params;
  
  // const paymentAmountLimitForCard = 50000; // Set your desired amount limit
  // const paymentAmountLimitForUpi = 100000; // Set the maximum amount for UPI payment
  // Generate a unique order ID
  const order_id = shortid.generate();
  // Store the payment details
  const storedData = await DirectorPayment.create({
    directorId,
    order_id,
    amount,
    paymentMethod,
  });
  // Save the payment details in the database
  // await storedData.save();
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
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
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
exports.directorpaymentverification = catchAsyncError(
  async (req, res, next) => {
    const { order_id, amount, paymentMethod } = req.body;
      console.log(req.body, req.params);

    const { directorId, scriptId } = req.params;
    // Convert directorId from string to ObjectId
    let directorObjectId;
    try {
      directorObjectId = ObjectId(directorId);
    } catch (error) {
      return res.status(400).json({ error: "Invalid directorId format" });
    }
    // Retrieve the stored payment details using the order ID
    const storedData = await DirectorPayment.findOne({ order_id });
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
    //   directorObjectId.toString() !== storedData.directorId.toString()
    // ) {
    //   return res.status(400).json({ error: "Invalid payment data" });
    // }
    // // Check if payment method is "card"
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

    const user = await User.findById(directorId);
    const Date = await DirectorPayment.findOne({directorId:directorId, scriptId:scriptId });
     
    const scriptid = await Publish.findOne({ _id: scriptId });
    const directorProfile = await DirectorProfile.findOne({ directorId: directorId });
    
    console.log(directorProfile);
    
    if (!scriptid || !directorProfile) {
      return res.status(404).json({ message: "Script or director profile not found" });
    }
    
    const imageUrl = `http://127.0.0.1:8000/api/v1/getProfileImageForDirector/${directorProfile.profilePic}`;
    
    const script = await Publish.findByIdAndUpdate(
      scriptId,
      {
        $addToSet: { 
          purchasedBy: directorId,
          purchaserUsernames: {
            _id: directorId,
            userName: user.userName, // Replace with the actual username
            movieName: scriptid.movieName,
            synopsis: scriptid.synopsis, // Replace with the actual synopsis
            profile: imageUrl, // Update to include the image URL
            status: "script Viewed",
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    
    
    if (!script) {
      return res.status(500).json({ message: "Failed to update script" });
    }
    
    const paymentUpdateResult = await DirectorPayment.findOneAndUpdate(
      { order_id },
      {
        scriptId,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!paymentUpdateResult) {
      return res.status(500).json({ message: "Failed to update director's payment" });
    }
    
    res.json({ status: "ok", script });
  });    