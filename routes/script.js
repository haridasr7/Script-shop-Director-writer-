const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  getDirectorPurchasedScripts,
} = require("../controllers/scriptController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const router = express.Router();
// Route to add a script to favorites
router
  .route("/users/:directorId/scripts/:scriptId/favorites")
  .post(isAuthenticatedUser, addToFavorites);
router
  .route("/users/:directorId/favorites")
  .get(isAuthenticatedUser, getFavorites);
  
  // Define the API route for removing from favorites
  router
    .route("/removeFromFavorites/:directorId/:scriptId")
    .post(isAuthenticatedUser, removeFromFavorites);
  router
    .route("/:directorId/purchased-scripts")
    .get(isAuthenticatedUser, getDirectorPurchasedScripts);
  
module.exports = router;
