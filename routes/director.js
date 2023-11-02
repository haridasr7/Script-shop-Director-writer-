const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const {
  updateScriptWithDirector,
} = require("../controllers/publishController");
const router = express.Router();
const scriptController = require("../controllers/scriptController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router
  .route("/scripts/:id/director'")
  .put(isAuthenticatedUser, updateScriptWithDirector);

module.exports = router;
