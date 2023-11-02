const express = require("express");
const {
  incrementViewerCount,
  getViewerCount,
  getAllScriptsWithViewersCount
} = require("../controllers/viewerController");

const router = express.Router();

// Increment Viewer Count
router.route("/increment-viewer-count/:postId").put(incrementViewerCount);

// Get Viewer Count
router.route("/viewer-count/:postId").get(getViewerCount);

//total view count
router.route("/allviewersviewer").get(getAllScriptsWithViewersCount);

module.exports = router;
