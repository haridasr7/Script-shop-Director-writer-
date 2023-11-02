const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const {
  newPublish,
  getFile,
  getAllScripts,
  getScriptById,
  getUserProfile,
  deleteScript,
  updateScript,
  getPDFFile,
  getDirectorDetails,
  getAllScriptsOfAllLogins,
  getScriptsByScriptTypeAndGenre, // Add the new controller function for fetching scripts by genre
  rateWriterScript,
  Purchasedscript,
  updateWriterScriptRating,
  updateScriptStatus,
  updateScriptStatusRead,
  getScriptByWriterId,
} = require("../controllers/publishController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const multer = require("multer");

// Set up storage configuration for multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only PDF, JPEG, PNG, and GIF are allowed."),
      false
    ); // Reject the file
  }
};
const upload = multer({ storage, fileFilter });

// Route to publish a new script
router
  .route("/publish/new/:writerId")
  .post(isAuthenticatedUser, upload.fields([
    { name: "scriptFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]), newPublish);

router.route("/getImage/:id").get(getFile);
router.route("/getPdf/:id").get(getPDFFile);


//get single script
router
  .route("/scripts/:scriptId")
  .get( getScriptById);

//get user profile
router.route("/profiles").get(isAuthenticatedUser, getUserProfile);


router.route("/getallscripts/:writerId").get(isAuthenticatedUser, getAllScripts);
router
  .route("/script/:id")
  .put(isAuthenticatedUser, upload.single("scriptFile"), updateScript);
  
router.route("/script/:id").delete(isAuthenticatedUser, deleteScript);
router
  .route("/scripts/:scriptId/director/:directorId")
  .get(isAuthenticatedUser, getDirectorDetails);

// Route to get scripts by genre
router.route("/director/scripts/:scriptType/:genre/all").get(getScriptsByScriptTypeAndGenre);
router
  .route("/director/scripts/:scriptType/all")
  .get(getScriptsByScriptTypeAndGenre);


  router
  .route("/purchasedscript/:scriptId")
  .get(Purchasedscript);

  router
  .route("/writerscripts/:writerId")
  .get( getScriptByWriterId);


 router.route("/updatestatus/:scriptId/:directorId").put(updateScriptStatus);


 router.route("/updateread/:scriptId/:directorId").put(updateScriptStatusRead);
// //for director

// router
//   .route("/director/scripts/:scriptType/all")
//   .get(isAuthenticatedUser, getAllScriptsOfAllLogins);

// router
//   .route("/scripts/:scriptId/rate")
//   .post(isAuthenticatedUser, rateWriterScript) // Add new rating
//   .put(isAuthenticatedUser, updateWriterScriptRating); // Update existing rating

module.exports = router;
