const catchAsyncError = require("../middlewares/catchAsyncError");
const Publish = require("../models/publishModel");
const User = require("../models/userModel");
const MyProfile = require("../models/myProfileModel");
const DirectorPayment = require("../models/directorPaymentModel");
const DirectorRating = require("../models/directorRatingModel");
const { GridFSBucket, MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");

const DirectorProfile = require("../models/directorProfileModel");

// Create a multer storage configuration
const storage = multer.memoryStorage();

// Create a multer upload instance with limits
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  },
});

const uri =
  "mongodb+srv://wdswebsoullabs:Writerdirectorscript@cluster0.pj2yaar.mongodb.net/ScriptShop?retryWrites=true&w=majority";
const databaseName = "ScriptShop";

const getDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(databaseName);
  return db;
};
// Publish New Script - api/v1/publish/new
exports.newPublish = catchAsyncError(async (req, res, next) => {
  try {
    let scriptFile = "";
    let imageFile = "";
    let scriptFileType;
    let imageFileType;

    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "scriptFile" });

    // Handle script file upload
    if (req.files && req.files["scriptFile"]) {
      const scriptFileFile = req.files["scriptFile"][0];
      const scriptFileUploadStream = bucket.openUploadStream(
        scriptFileFile.originalname
      );
      const scriptFileFileId = scriptFileUploadStream.id;
      scriptFileUploadStream.end(scriptFileFile.buffer);
      scriptFile = scriptFileFileId;
      scriptFileType = scriptFileFile.mimetype;
    }

    // Handle image file upload
    if (req.files && req.files["imageFile"]) {
      const imageFileFile = req.files["imageFile"][0];
      const imageFileUploadStream = bucket.openUploadStream(
        imageFileFile.originalname
      );
      const imageFileFileId = imageFileUploadStream.id;
      imageFileUploadStream.end(imageFileFile.buffer);
      imageFile = imageFileFileId;
      imageFileType = imageFileFile.mimetype;
    }

    // Extract the writer ID from the URL parameters
    const writerId = req.params.writerId;

    // Extract the script details from the request body
    const { movieName, synopsis, genre, scriptType } = req.body;

    // Check if the movieName already exists
    const existingScript = await Publish.findOne({ movieName });
    if (existingScript) {
      return res.status(400).json({ error: "Movie name already exists" });
    }

    // Create a new script instance
    const publish = await Publish.create({
      writerId,
      movieName,
      synopsis,
      genre,
      scriptType,
      scriptFile,
      imageFile,
      scriptFileType,
      imageFileType,
    });

    // Populate the 'writerId' field with 'userName'
    await publish.populate("writerId", "userName");

    // Include the 'userName' of the writer in the response
    const scriptWithWriterName = {
      _id: publish._id,
      movieName: publish.movieName,
      synopsis: publish.synopsis,
      genre: publish.genre,
      scriptType: publish.scriptType,
      purchasedBy: publish.purchasedBy,
      writerName: publish.writerId.userName,
      scriptFile: scriptFile, // Use scriptFile as scriptId
      imageFile: imageFile, // Use imageFile as imageId
    };

    res.status(201).json(scriptWithWriterName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to publish script." });
  }
});

exports.getFile = catchAsyncError(async (req, res, next) => {
  try {
    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "scriptFile" });
    const fileId = req.params.id;
    const fileExists = await bucket
      .find({ _id: new ObjectId(fileId) })
      .limit(1)
      .toArray();
    if (fileExists.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getPDFFile = catchAsyncError(async (req, res, next) => {
  try {
    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "scriptFile" });
    const fileId = req.params.id;
    const fileExists = await bucket
      .find({ _id: new ObjectId(fileId) })
      .limit(1)
      .toArray();
    if (fileExists.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    res.set("Content-Type", "application/pdf");
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all scripts - api/v1/scripts
exports.getAllScripts = catchAsyncError(async (req, res, next) => {
  try {
    const writerId = req.params.writerId;
    const scripts = await Publish.find({ writerId });
    res.status(200).json(scripts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get scripts." });
  }
});

// Get script by id
exports.getScriptById = catchAsyncError(async (req, res, next) => {
  try {
    const { scriptId } = req.params;
    // Find the script by scriptId and writerId
    const script = await Publish.findOne({ _id: scriptId });
    // If the script is not found or doesn't belong to the specified writer, return an error
    if (!script) {
      return res.status(404).json({ error: "Script not found." });
    }
    // Populate the 'writerId' field with 'userName'
    await script.populate("writerId", "userName");
    // Include the 'userName' of the writer and the scriptId in the response
    const scriptWithWriterName = {
      _id: script._id,
      writerId: script.writerId, // Include the writerId in the response
      movieName: script.movieName,
      synopsis: script.synopsis,
      genre: script.genre,
      scriptType: script.scriptType,
      writerName: script.writerId.userName,
      scriptId: script.scriptFile, // Use scriptFile as scriptId
      imageId: script.imageFile, // Use imageFile as imageId
      purchaseBy: script.purchasedBy,
      purchaserUsernames: script.purchaserUsernames,
    };
    res.status(200).json(scriptWithWriterName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the script." });
  }
});

// Assuming the director's request contains the writer's userId as a request parameter
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  try {
    const writerId = req.query.writerId;

    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "profilePic" });
    if (req.file) {
      const profile1Pic = req.file;
      const profile1UploadStream = bucket.openUploadStream(
        profile1Pic.originalname
      );
      const profile1FileId = profile1UploadStream.id;
      profile1UploadStream.end(profile1Pic.buffer);
      profilePic = profile1FileId;
    }
    // Find the writer's profile by userId
    const writerProfile = await MyProfile.findOne({
      writerId: new ObjectId(writerId),
    });
    // If the writer's profile is not found, return an error
    if (!writerProfile) {
      return res.status(404).json({ error: "Writer's profile not found." });
    }
    res.status(200).json({
      success: true,
      writerProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the writer's profile." });
  }
});

// Get director details for a script
exports.getDirectorDetails = catchAsyncError(async (req, res, next) => {
  const scriptId = req.params.scriptId;
  const directorId = req.params.directorId;

  const script = await Publish.findById(scriptId).populate(
    "purchasedBy.director"
  );
  if (!script) {
    return res.status(404).json({ error: "Script not found." });
  }

  // Check if the director exists
  const director = await Director.findById(directorId);
  if (!director) {
    return res.status(404).json({ error: "Director not found." });
  }

  res.status(200).json({
    scriptId: script._id,
    directorId: director._id,
    directorName: director.name,
    directorEmail: director.email,
    directorPhoneNumber: director.phoneNumber,
  });
});

// Update Script - api/v1/publish/:id
exports.updateScript = catchAsyncError(async (req, res, next) => {
  const scriptId = req.params.id;
  // Check if the script exists
  const script = await Publish.findById(scriptId);
  if (!script) {
    return res.status(404).json({ error: "Script not found" });
  }
  // Extract the updated script details from the request body
  const { movieName, synopsis, genre, scriptType } = req.body;
  // Update the script details if the fields are present
  if (movieName) {
    script.movieName = movieName;
  }
  if (synopsis) {
    script.synopsis = synopsis;
  }
  if (genre) {
    script.genre = genre;
  }
  if (scriptType) {
    script.scriptType = scriptType;
  }
  // Save the updated script
  const updatedScript = await script.save();
  res.status(200).json({
    movieName: updatedScript.movieName,
    synopsis: updatedScript.synopsis,
    genre: updatedScript.genre,
    scriptType: updatedScript.scriptType,
  });
});

// Delete Product - api/v1/product/:id
exports.deleteScript = catchAsyncError(async (req, res, next) => {
  const script = await Publish.findById(req.params.id);

  if (!script) {
    return res.status(404).json({
      success: false,
      message: "Script not found",
    });
  }
  await script.remove();
  res.status(200).json({
    success: true,
    message: "Script Deleted!",
  });
});

// exports.getAllScriptsOfAllLogins = catchAsyncError(async (req, res, next) => {
//   try {
//     const { scriptType } = req.params;
//     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter, default to 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Get the limit (number of documents per page) from the query parameter, default to 10 if not provided

//     // Calculate the number of documents to skip based on the current page and limit
//     const skip = (page - 1) * limit;

//     // Fetch all scripts and populate the 'writerId' field with 'userName'
//     const publish = await Publish.find({ scriptType }).skip(skip).limit(limit);

//     // Get the total count of scripts with the specified scriptType (for calculating total pages)
//     const totalCount = await Publish.countDocuments({ scriptType });

//     // Map the result to include writer name as 'writerName' and exclude 'scriptFile'
//     const scriptsWithWriterName = await Promise.all(
//       publish.map(async (script) => {
//         if (script.writerId) {
//           let id = script.writerId;
//           const user = await User.findById(id);

//           return {
//             _id: script._id,
//             movieName: script.movieName,
//             synopsis: script.synopsis,
//             genre: script.genre,
//             scriptType: script.scriptType,
//             purchasedBy: script.purchasedBy,
//             writerName: user.userName, // Include the 'userName' of the writer in the result
//           };
//         } else {
//           return {
//             _id: script._id,
//             movieName: script.movieName,
//             synopsis: script.synopsis,
//             genre: script.genre,
//             scriptType: script.scriptType,
//             purchasedBy: script.purchasedBy,
//           };
//         }
//       })
//     );

//     // Calculate total pages based on the total count and limit
//     const totalPages = Math.ceil(totalCount / limit);

//     res.status(200).json({
//       success: true,
//       scripts: scriptsWithWriterName,
//       currentPage: page,
//       totalPages: totalPages,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch scripts." });
//   }
// });

exports.getScriptsByScriptTypeAndGenre = catchAsyncError(
  async (req, res, next) => {
    try {
      const { scriptType, genre } = req.params;

      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter, default to 1 if not provided
      const limit = parseInt(req.query.limit) || 12; // Get the limit (number of documents per page) from the query parameter, default to 10 if not provided

      // Calculate the number of documents to skip based on the current page and limit
      const skip = (page - 1) * limit;

      // Define the query object based on whether genre is provided or not
      const query = genre ? { scriptType, genre, ispaid: true } : { scriptType, ispaid: true }; // Change filter for ispaid field to true

      // Fetch scripts of the specified genre and populate the 'writerId' field with 'userName'
      const publish = await Publish.find(query).skip(skip).limit(limit);

      // Get the total count of scripts with the specified scriptType (for calculating total pages)
      const totalCount = await Publish.countDocuments(query);

      // Map the result to include writer name as 'writerName' and exclude 'scriptFile'
      const scriptsWithWriterName = await Promise.all(
        publish.map(async (script) => {
          if (script.writerId) {
            let id = script.writerId;
            const user = await User.findById(id);

            return {
              _id: script._id,
              movieName: script.movieName,
              imageFile: script.imageFile,
              synopsis: script.synopsis,
              scriptType: script.scriptType,
              genre: script.genre,
              purchasedBy: script.purchasedBy,
              writerName: user.userName, // Include the 'userName' of the writer in the result
            };
          } else {
            return {
              _id: script._id,
              directorRatings: script.directorRatings,
              movieName: script.movieName,
              synopsis: script.synopsis,
              scriptType: script.scriptType,
              genre: script.genre,
              purchasedBy: script.purchasedBy,
            };
          }
        })
      );

      // Calculate total pages based on the total count and limit
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({
        success: true,
        scripts: scriptsWithWriterName,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch scripts." });
    }
  }
);

// Get script by id
exports.Purchasedscript = catchAsyncError(async (req, res, next) => {
  try {
    const { scriptId } = req.params;
    // Find the script by scriptId
    const script = await Publish.findOne({ _id: scriptId });
    // If the script is not found, return an error
    if (!script) {
      return res.status(404).json({ error: "Script not found." });
    }

    // Populate the 'writerId' field with 'userName'
    await script.populate("writerId", "userName");

    // Create an array to store objects with _id, userName, synopsis, Scriptname, status, and createdAt
    // const purchaserUsernames = [];

    // Iterate through the 'purchasedBy' array and retrieve user information
    // for (const purchase of script.purchasedBy) {
    //   // Assuming each purchase has a 'userId' field
    //   const user = await User.findById(purchase);
    //   const directorId = user._id;
    //   const Date = await DirectorPayment.findOne({directorId:directorId, scriptId:scriptId });

    //   if (user) {

    //     purchaserUsernames.push({
    //       _id: user._id,
    //       userName: user.userName,
    //       synopsis: script.synopsis,
    //       Scriptname: script.movieName,
    //       PurchasedDate:Date.createdAt,
    //     });
    //   }
    // }

    // // Update the script's purchaserUsernames field
    // script.purchaserUsernames = purchaserUsernames;

    // // Save the updated script

    // // Include the 'userName' of the writer, scriptId, purchaser usernames, and createdAt in the response
    // const scriptWithWriterAndPurchasers = {
    //   _id: script._id,
    //   writerId: script.writerId, // Include the writerId in the response
    //   movieName: script.movieName,
    //   synopsis: script.synopsis,
    //   writerName: script.writerId.userName,
    //   purchasedBy: script.purchasedBy,
    //   purchaserUsernames: purchaserUsernames, // Include an array of purchaser objects with _id, userName, synopsis, Scriptname, status, and createdAt
    // };

    res.status(200).json(scriptWithWriterAndPurchasers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the script." });
  }
});

exports.updateScriptStatus = catchAsyncError(async (req, res, next) => {
  try {
    const { scriptId, directorId } = req.params;

    // Assuming you have a Mongoose model for your script named "Publish"
    const script = await Publish.findById(scriptId);

    // If the script is not found, return an error
    if (!script) {
      return res.status(404).json({ error: "Script not found." });
    }

    // Assuming you have a Mongoose model for your user named "User"
    const director = await User.findById(directorId);

    // If the director is not found, return an error
    if (!director) {
      return res.status(404).json({ error: "Director not found." });
    }

    // Update the status for the director in the script
    const updatedPurchaserUsernames = script.purchaserUsernames.map(
      (purchase) => {
        if (purchase._id.toString() === directorId) {
          return {
            ...purchase,
            status: "script downloaded",
          };
        }
        return purchase;
      }
    );

    // console.log(updatedPurchaserUsernames);
    script.purchaserUsernames = updatedPurchaserUsernames;

    // Save the updated script
    await script.save();

    res.status(200).json({
      success: true,
      message: "Script status updated to 'script downloaded' for the director.",
      updatedScript: script,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the script status." });
  }
});

exports.updateScriptStatusRead = catchAsyncError(async (req, res, next) => {
  try {
    const { scriptId, directorId } = req.params;

    // Assuming you have a Mongoose model for your script named "Publish"
    const script = await Publish.findById(scriptId);

    // If the script is not found, return an error
    if (!script) {
      return res.status(404).json({ error: "Script not found." });
    }

    // Assuming you have a Mongoose model for your user named "User"
    const director = await User.findById(directorId);

    // If the director is not found, return an error
    if (!director) {
      return res.status(404).json({ error: "Director not found." });
    }

    // Update the status for the director in the script
    const updatedPurchaserUsernames = script.purchaserUsernames.map(
      (purchase) => {
        if (purchase._id.toString() === directorId) {
          return {
            ...purchase,
            status: "script Read",
          };
        }
        return purchase;
      }
    );

    script.purchaserUsernames = updatedPurchaserUsernames;

    // Save the updated script
    await script.save();

    console.log(script);
    res.status(200).json({
      success: true,
      message: "Script status updated to 'script downloaded' for the director.",
      updatedScript: script,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the script status." });
  }
});

// Get script by id
exports.getScriptByWriterId = catchAsyncError(async (req, res, next) => {
  try {
    const { writerId } = req.params;

    // Find all scripts that match the writerId
    const scripts = await Publish.find({ writerId: writerId })
      .populate("writerId", "userName")
      .exec();

    // If no scripts are found, return an error
    if (!scripts || scripts.length === 0) {
      return res.status(404).json({ error: "Writer Scripts not found." });
    }

    // Create an array to store the modified scripts
    const scriptsWithDetails = [];

    // Iterate through each script and add movieName and purchaserUsernames
    scripts.forEach((script) => {
      const scriptDetails = {
        _id: script._id,
        writerId: script.writerId, // Include the writerId in the response
        movieName: script.movieName,
        synopsis: script.synopsis,
        genre: script.genre,
        scriptType: script.scriptType,
        writerName: script.writerId.userName,
        scriptId: script.scriptFile, // Use scriptFile as scriptId
        imageId: script.imageFile, // Use imageFile as imageId,
        purchaseBy: script.purchasedBy,
        purchaserUsernames: script.purchaserUsernames,
        // Include movieName and purchaserUsernames
        movieName: script.movieName,
        purchaserUsernames: script.purchaserUsernames,
      };

      scriptsWithDetails.push(scriptDetails);
    });

    res.status(200).json(scriptsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the scripts." });
  }
});

// Update Script Status - api/v1/updatestatus/:scriptId/:directorId
// exports.updateScriptstatus = catchAsyncError(async (req, res, next) => {
//   try {
//     const { scriptId, directorId } = req.params;
//     // Find the script by scriptId
//     const script = await Publish.findOne({ _id: scriptId });
//     console.log(script)
//     // If the script is not found, return an error
//     if (!script) {
//       return res.status(404).json({ error: "Script not found." });
//     }

//     // Map the purchasedBy array and change the status for the director
//     const updatedPurchasedBy = script.purchasedBy.map((purchase) => {

//       // Assuming each purchase has a 'userId' field
//       if (purchase._id === directorId) {

//         return {
//           userId: directorId,
//           status: "script downloaded",
//         };
//       }
//       return purchase;
//     });

//     // Update the script's purchasedBy with the modified array
//     script.purchasedBy = updatedPurchasedBy;

//     // Save the updated script
//     await script.save();

//     res.status(200).json({ success: true, message: "Script status updated to 'script downloaded' for the director." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update the script status." });
//   }
// });

// // Rate Writer's Script - api/v1/scripts/:scriptId/rate
// exports.rateWriterScript = catchAsyncError(async (req, res, next) => {
//   const { scriptId } = req.params;
//   const { rating } = req.body;

//   // Get the director ID from the authenticated user (Assuming it is stored in req.user)
//   const directorId = req.user._id;

//   // Check if the script exists
//   const script = await Publish.findById(scriptId);
//   if (!script) {
//     return res.status(404).json({ error: "Script not found." });
//   }

//   // Check if the director has already rated this script
//   const existingRating = await DirectorRating.findOne({
//     director: directorId,
//     script: scriptId,
//   });
//   if (existingRating) {
//     return res.status(400).json({ error: "Director already rated this script. You can update your rating if you want." });
//   }

//   // Create a new DirectorRating instance
//   const newRating = new DirectorRating({
//     director: directorId,
//     script: scriptId,
//     rating,
//   });

//   // Save the new rating to the database
//   await newRating.save();

//   // Add the new rating to the script's directorRatings array
//   script.directorRatings.push(newRating._id);

//   // Save the updated script
//   await script.save();

//   res.status(200).json({ success: true, message: "Script rated successfully." });
// });

// // Update Writer's Script Rating - api/v1/scripts/:scriptId/rate
// exports.updateWriterScriptRating = catchAsyncError(async (req, res, next) => {
//   const { scriptId } = req.params;
//   const { rating } = req.body;

//   // Get the director ID from the authenticated user (Assuming it is stored in req.user)
//   const directorId = req.user._id;

//   // Check if the script exists
//   const script = await Publish.findById(scriptId);
//   if (!script) {
//     return res.status(404).json({ error: "Script not found." });
//   }

//   // Check if the director has already rated this script
//   const existingRating = await DirectorRating.findOne({
//     director: directorId,
//     script: scriptId,
//   });

//   if (!existingRating) {
//     return res.status(400).json({ error: "You haven't rated this script yet. Use the 'rateWriterScript' endpoint to add a new rating." });
//   }

//   // Update the rating
//   existingRating.rating = rating;
//   await existingRating.save();

//   res.status(200).json({ success: true, message: "Script rating updated successfully." });
// });
