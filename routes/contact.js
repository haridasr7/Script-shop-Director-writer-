const express = require("express");
const router = express.Router();
const {
  submitContactForm,
  getContactDetails,
} = require("../controllers/contactusController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route('/contact').post( submitContactForm);
router.route("/getContactDetails").get(isAuthenticatedUser, getContactDetails);

module.exports = router;
