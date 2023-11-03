const express = require("express");
const multer = require("multer");
const path = require("path");

// Set up storage configuration for multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};
const upload = multer({ storage, fileFilter });
const {
  createUserProfile,
  getUserProfile,
  getProfileImageFile,
  followProfile,
  unfollowProfile,
  getFollowersCount,
  updateUserProfile,
} = require("../controllers/myprofileController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router
  .route("/myprofile")
  .put(upload.fields([{ name: "profilePic", maxCount: 1 }]),isAuthenticatedUser, createUserProfile);

router.route("/myprofile/:id").get(isAuthenticatedUser, getUserProfile);

router
  .route("/getProfileImage/:id")
  .get(isAuthenticatedUser, getProfileImageFile);

router
  .route("/profiles/:profileId/follow/:writerId")
  .post(isAuthenticatedUser, followProfile);
router
  .route("/profiles/:profileId/unfollow/:writerId")
  .post(isAuthenticatedUser, unfollowProfile);
router
  .route("/profiles/:profileId/followers/:writerId/count")
  .get(isAuthenticatedUser, getFollowersCount);

module.exports = router;
