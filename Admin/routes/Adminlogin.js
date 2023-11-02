const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admincontoller');


router.post('/admin/register', adminController.registerAdmin);
// Admin login route
router.post('/admin/login', adminController.adminLogin);

// Forgot password route
router.post('/admin/forgot-password', adminController.forgotPassword);

// Reset password route
router.post('/admin/reset-password', adminController.resetPassword);


router.route("/Adminlogout").get(adminController.logoutAdmin);

module.exports = router;
