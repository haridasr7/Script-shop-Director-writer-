const catchAsyncError = require("../middlewares/catchAsyncError");
const DirectorProfile = require("../models/directorProfileModel");
const User = require("../models/userModel");
const { GridFSBucket, MongoClient, ObjectId } = require("mongodb");

const multer = require("multer");

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

exports.createDirectorProfile = catchAsyncError(async (req, res, next) => {
  const { name, bio, businessEmail, phoneNumber } = req.body;
  let profilePic;
  // Get the directorId from the URL params
  const { directorId } = req.query;

  try {
    const db = await getDatabase();
    const bucket = new GridFSBucket(db, {
      bucketName: "directorProfilePic",
    });
    if (req.files && req.files["profilePic"]) {
      let profile2Pic = req.files["profilePic"][0];
      const profile2UploadStream = bucket.openUploadStream(
        profile2Pic.originalname
      );
      const profile2FileId = profile2UploadStream.id;
      profile2UploadStream.end(profile2Pic.buffer);
      profilePic = profile2FileId;
    }

    let newDirectorProfile;

    if (directorId) {
      const existingDirectorProfile = await DirectorProfile.findOne({
        directorId,
      });

      if (existingDirectorProfile) {
        newDirectorProfile = await DirectorProfile.findOneAndUpdate(
          { directorId },
          {
            profilePic,
            name,
            bio,
            businessEmail,
            phoneNumber,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        newDirectorProfile = await DirectorProfile.create({
          directorId,
          profilePic,
          name,
          bio,
          businessEmail,
          phoneNumber,
        });
      }
    } else {
      return res.status(400).json({
        error: "directorId is required in the query parameter.",
      });
    }

    // Update the user's profile field with the newly created/updated profile ID
    await User.findOneAndUpdate(
      { _id: directorId },
      { profile: newDirectorProfile._id },
      {
        new: true,
        runValidators: true,
      }
    );

    // Include all profile fields in the response
    res.status(201).json({
      success: true,
      profile: newDirectorProfile,
    });
  } catch (error) {
    console.log(error);

    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ error: validationErrors });
    }
    if (error.code === 11000 && error.keyPattern.phoneNumber) {
      res.status(400).json({ error: ["Phone number already exists."] });
    } else if (error.code === 11000 && error.keyPattern.businessEmail) {
      res.status(400).json({ error: ["Email already exists."] });
    } else {
      res
        .status(500)
        .json({ error: ["Failed to create/update user profile."] });
    }
  }
});
// Get user profile
exports.getDirectorProfile = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const directorProfile = await DirectorProfile.findOne({ directorId: id });
  try {
    res.status(200).json({
      success: true,
      profile: directorProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user profile." });
  }
});

//get profile image file
exports.getProfileImageFileForDirector = catchAsyncError(
  async (req, res, next) => {
    console.log("getImage" + req.params.id);
    try {
      const db = await getDatabase();
      const bucket = new GridFSBucket(db, { bucketName: "directorProfilePic" });
      const fileId = req.params.id;
      console.log(fileId);

      const fileExists = await bucket
        .find({ _id: new ObjectId(fileId) })
        .limit(1)
        .toArray();
      if (fileExists.length === 0) {
        return res.status(404).json({ message: "File not found" });
      }
      const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
      downloadStream.pipe(res);
      console.log(fileId);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
