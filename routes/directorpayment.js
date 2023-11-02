const express = require("express");
const {
  directorprocessPayment,
  directorpaymentverification,
} = require("../controllers/directorPaymentController");

const { isAuthenticatedUser } = require("../middlewares/authenticate");
const { monthwisePurchaseData, totalDataForProgressBar } = require("../controllers/graphController");
const router = express.Router();
router
  .route("/payment/process/:directorId")
  .post(isAuthenticatedUser, directorprocessPayment);
router
  .route("/payment/verification/:directorId/:scriptId")
  .post( directorpaymentverification);

  router
    .route("/yearwisegraph")
  .get(isAuthenticatedUser, monthwisePurchaseData);

 router
   .route("/yearwiseprogressbar")
   .get(isAuthenticatedUser, totalDataForProgressBar);   


module.exports = router;
