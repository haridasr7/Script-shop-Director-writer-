const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { getGraphDataForWriter } = require("../controllers/graphController");

dotenv.config({ path: path.join(__dirname, "config/config.env") });
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

// Route to get script purchase data for a specific writer
// router
//   .route("/graph/writer/:writerId")
//   .get(isAuthenticatedUser, getGraphDataForWriter);

module.exports = router;
