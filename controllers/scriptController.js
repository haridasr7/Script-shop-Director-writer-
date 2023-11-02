const User = require("../models/userModel");
const Publish = require("../models/publishModel");

const catchAsyncError = require("../middlewares/catchAsyncError");

exports.addToFavorites = catchAsyncError(async (req, res, next) => {
  const { directorId, scriptId } = req.params;
  try {
    // Find the User by directorId and update their favorites
    const user = await User.findByIdAndUpdate(
      directorId,
      { $addToSet: { favoriteScripts: scriptId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, user, message: "Added to Favorite Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.getFavorites = catchAsyncError(async (req, res, next) => {
  const { directorId } = req.params;
  console.log(directorId);
  try {
    const user = await User.findById(directorId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.removeFromFavorites = catchAsyncError(async (req, res, next) => {
  const { directorId, scriptId } = req.params;
  try {
    // Find the User by directorId and remove the scriptId from their favorites
    const user = await User.findByIdAndUpdate(
      directorId,
      { $pull: { favoriteScripts: scriptId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        user,
        message: "Removed from Favorites Successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Function to get scripts purchased by a director
exports.getDirectorPurchasedScripts = catchAsyncError(async (req, res) => {
  const directorId = req.params.directorId;
  try {
    const purchasedScripts = await Publish.find({ purchasedBy: directorId })
      .populate("purchasedBy");
    res.status(200).json(purchasedScripts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching purchased scripts",
      error: error.message,
    });
  }
});
