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
  createDirectorProfile,
  getDirectorProfile,
  getProfileImageFileForDirector,
} = require("../controllers/directorProfileController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router
  .route("/directorprofile")
  .put(
    upload.fields([{ name: "profilePic", maxCount: 1 }]),
    isAuthenticatedUser,
    createDirectorProfile
  );

router
  .route("/directorprofile/:id")
  .get( getDirectorProfile);//isauth

router
  .route("/getProfileImageForDirector/:id")
  .get( getProfileImageFileForDirector);//isauth

module.exports = router;
