const express = require('express');
const multer = require('multer');
const path = require('path')

// const upload = multer({storage: multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
//     },
//     filename: function(req, file, cb ) {
//         cb(null, file.originalname)
//     }
// }) })



const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  logoutUser
} = require("../controllers/authController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route("/logout").get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route("/password/change/:userId").put(isAuthenticatedUser, changePassword);
router.route("/update/:userId").put(isAuthenticatedUser, updateProfile);

 
module.exports = router;