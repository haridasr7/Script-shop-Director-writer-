const Viewer = require("../models/viewerModel");
const Publish = require("../models/publishModel");
const User = require("../models/userModel");

// Increment the viewer count
exports.incrementViewerCount = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Find the viewer entry for the script
    let viewer = await Viewer.findOne({ scriptId: postId });

    // If the script is not found in the viewer model, create a new entry
    if (!viewer) {
      viewer = new Viewer({ scriptId: postId, count: 1 });
    } else {
      // If the script is found, increment the count
      viewer.count += 1;
    }

    // Save the viewer entry
    await viewer.save();

    res.status(200).json({ success: true, viewerCount: viewer.count });
  } catch (error) {
    next(error);
  }
};

// Get the viewer count
exports.getViewerCount = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const viewer = await Viewer.findOne({ scriptId: postId });
    const scriptdetails = await Publish.findOne({ _id: postId });

    const purchasedDirectors = scriptdetails.purchasedBy.length;


    res.status(200).json({ success: true,
       movieName: scriptdetails.movieName,
       viewercount:viewer.count,
       purchasedDirectors,
       });
  } catch (error) {
    next(error);
  }
};


// Get all the scripts from the Publish collection with viewers count using the map function
exports.getAllScriptsWithViewersCount = async (req, res, next) => {
  try {
    const scripts = await Publish.find({}).select('movieName purchaserUsernames favoriteScripts');

    const scriptsWithViewersCount = await Promise.all(
      scripts.map(async (script) => {
        const viewer = await Viewer.findOne({ scriptId: script._id });
        const viewersCount = viewer ? viewer.count : 0;
        return {
          movieName: script.movieName,
          DirectorsPurchased: script.purchaserUsernames.length,
          AddedToFavourites: script.favoriteScripts.length, // Ensure favoriteScripts is accessible
          viewersCount: viewersCount
        };
      })
    );

    res.status(200).json({ success: true, scripts: scriptsWithViewersCount });
  } catch (error) {
    next(error);
  }
};

