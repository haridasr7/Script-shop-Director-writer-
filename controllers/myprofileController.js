const catchAsyncError = require("../middlewares/catchAsyncError");
const MyProfile = require("../models/myProfileModel");
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

// Create user profile
exports.createUserProfile = catchAsyncError(async (req, res, next) => {
  const { name, bio, businessEmail, phoneNumber } = req.body;
  let profilePic;

  console.log(req.files)

  // Get the writerId from the URL params
  const { writerId } = req.query;

  try {
    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "profilePic" });
    if (req.files && req.files["profilePic"]) {
      let profile1Pic = req.files["profilePic"][0];
      const profile1UploadStream = bucket.openUploadStream(
        profile1Pic.originalname
      );
      const profile1FileId = profile1UploadStream.id;
      profile1UploadStream.end(profile1Pic.buffer);
      profilePic = profile1FileId;
    }

    let myProfile;

    if (writerId) {
      // Find if the director profile already exists
      const existingMyProfile = await MyProfile.findOne({
        writerId,
      });
      if (existingMyProfile) {
        // Update the existing director profile
        myProfile = await MyProfile.findOneAndUpdate(
          { writerId },
          {
            profilePic,
            name,
            bio,
            businessEmail,
            phoneNumber,
            followers: [],
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        // Create a new director profile
        myProfile = await MyProfile.create({
          writerId,
          profilePic,
          name,
          bio,
          businessEmail,
          phoneNumber,
          followers: [],
        });
      }
    } else {
      // Handle the case where directorId is not provided
      return res.status(400).json({
        error: "writerId is required in the query parameter.",
      });
    }

    // Update the user's profile field with the newly created profile ID
    await User.findByIdAndUpdate(
      { _id: writerId },
      { profile: myProfile._id },
      {
        new: true,
        runValidators: true,
      }
    );

    // Include writerId in the response
    res.status(201).json({
      success: true,
      profile: myProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user profile." });
  }
});

// Get user profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const myProfile = await MyProfile.findOne({ writerId: id });
  try {
    res.status(200).json({
      success: true,
      profile: myProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user profile." });
  }
});

//get profile image file
exports.getProfileImageFile = catchAsyncError(async (req, res, next) => {
  try {
    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "profilePic" });
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
});

exports.followProfile = catchAsyncError(async (req, res, next) => {
  const { profileId, writerId } = req.params; // Get writerId from params
  console.log(profileId, writerId);
  const userId = req.user.id;

  const myProfile = await MyProfile.findById(profileId);

  if (!myProfile) {
    return next(new ErrorHandler("Profile not found", 404));
  }

  // Check if the user is already following the profile
  if (myProfile.followers.includes(userId)) {
    return res.status(400).json({
      success: false,
      message: "You are already following this profile",
    });
  }

  // Add the user ID to the followers array
  myProfile.followers.push(userId);
  await myProfile.save();

  res.status(200).json({
    success: true,
    message: "You are now following this profile",
  });
});

// Unfollow a user profile
exports.unfollowProfile = catchAsyncError(async (req, res, next) => {
  const { profileId, writerId } = req.params; // Get writerId from params
  const userId = req.user.id; // Use req.user.id instead of req.body.userId

  // Check if the user is already following the profile
  const myProfile = await MyProfile.findById(profileId);
  if (!myProfile.followers.includes(userId)) {
    return res.status(400).json({
      success: true,
      message: "You are not following this profile",
    });
  }

  // Remove the user from the followers list
  const index = myProfile.followers.indexOf(userId);
  myProfile.followers.splice(index, 1);
  await myProfile.save();

  res.status(200).json({
    success: true,
    message: "You have unfollowed this profile",
  });
});

// Get followers count for a user profile
exports.getFollowersCount = catchAsyncError(async (req, res, next) => {
  const { profileId, writerId } = req.params;

  // Find the profile and get the number of followers
  const myProfile = await MyProfile.findById(profileId);
  const followersCount = myProfile.followers.length;

  res.status(200).json({
    success: true,
    writerId,
    followersCount,
  });
});
