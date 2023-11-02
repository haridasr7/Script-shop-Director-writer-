const express = require('express');
const { processPayment, verification,writerprocessPayment,verifyWriterPayment} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/payment/process').post( isAuthenticatedUser, processPayment);
router.route('/payment/verification').post( isAuthenticatedUser, verification);
router.route('/payment/writer').post(writerprocessPayment);//writerpayment 
router.route('/payment/writer/verification').post(verifyWriterPayment);//writerpayment verification
module.exports = router;


