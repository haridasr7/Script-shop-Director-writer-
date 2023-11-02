const User = require("../../models/userModel");
const BlockedUser = require("../models/Blockeduser");
const Publish = require("../../models/publishModel"); // Replace with the actual Publish model import
const Contact = require("../../models/contactModel");
const PaymentModel = require("../../models/PaymentModel");
const DirectorPayment = require("../../models/directorPaymentModel");
const DirectorProfile = require("../../models/directorProfileModel");
const MyProfile = require("../../models/myProfileModel");
//get the director or writer

exports.viewUsersByRoles = async (req, res) => {
  try {
    const { roles } = req.params; // Get the roles from the request parameters as a string

    const userRoleDetails = [];
    const rolesArray = roles.split(",");

    // Make sure rolesArray is an array before using it in the query
    const users = await User.find({ role: { $in: rolesArray } }).select(
      "_id userName role"
    );

    for (const user of users) {
      let scriptDetails = {};

      if (user.role.includes("director")) {
        const directorProfile = await DirectorProfile.findOne({
          directorId: user._id,
        });
        if (directorProfile) {
          const imageUrl = `http://127.0.0.1:8000/api/v1/getProfileImageForDirector/${directorProfile.profilePic}`;
          scriptDetails = {
            userid: user._id,
            role: user.role[0],
            userName: user.userName,
            imageUrl: imageUrl, // Include the imageUrl
          };
        } else {
          scriptDetails = {
            userid: user._id,
            role: user.role[0],
            userName: user.userName,
            imageUrl: "", // Empty string when there is no directorProfile
          };
        }
      } else if (user.role.includes("writer")) {
        const writerProfile = await MyProfile.findOne({ writerId: user._id });
        if (writerProfile) {
          const imageUrl = `http://127.0.0.1:8000/api/v1/getProfileImageForWriter/${writerProfile.profilePic}`;
          scriptDetails = {
            userid: user._id,
            role: user.role[0],
            userName: user.userName,
            imageUrl: imageUrl, // Include the imageUrl
          };
        } else {
          scriptDetails = {
            userid: user._id,
            role: user.role[0],
            userName: user.userName,
            imageUrl: "", // Empty string when there is no writerProfile
          };
        }
      }
      userRoleDetails.push(scriptDetails);
    }

    if (!userRoleDetails || userRoleDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found for the specified roles" });
    }

    // Return the list of users with userName, role, and imageUrl (if available for the director or writer)
    res.status(200).json({ userRoleDetails });
  } catch (error) {
    console.error("Error fetching users by roles:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecentlyRegisteredUsers = async (req, res) => {
  try {
    // Query the database to find the four most recently registered users
    const users = await User.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (recent to oldest)
      .limit(4); // Limit the result to four users

    // Return the list of recently registered users
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching recently registered users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserCounts = async (req, res) => {
  try {
    let totalRevenueWriter = 0;
    let totalRevenueDirector = 0;

    // Count the number of users with the role "writer"
    const writerCount = await User.countDocuments({ role: "writer" });

    // Count the number of users with the role "director"
    const directorCount = await User.countDocuments({ role: "director" });

    // Count the total number of users
    const totalUserCount = await User.countDocuments();

    const directorPayments = await DirectorPayment.find();
    const writerPayments = await PaymentModel.find();

    if (writerPayments.length > 0) {
      writerPayments.forEach((payment) => {
        totalRevenueWriter += payment.amount;
      });
    }

    if (directorPayments.length > 0) {
      directorPayments.forEach((payment) => {
        totalRevenueDirector += payment.amount;
      });
    }

    const totalRevenue = totalRevenueWriter + totalRevenueDirector;

    // Return the counts
    res
      .status(200)
      .json({ writerCount, directorCount, totalUserCount, totalRevenue });
  } catch (error) {
    console.error("Error calculating user counts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllScriptDetails = async (req, res) => {
  try {
    // Find all scripts
    const scripts = await Publish.find();
    console.log(scripts);

    // Create an array to store script details
    const scriptDetails = [];

    // Iterate through the scripts
    for (const script of scripts) {
      // Extract script details with default values if fields are missing
      for (const scriptdetails of script.purchaserUsernames) {
        // Declare scriptDetail here
        let scriptDetail = {
          scriptid: scriptdetails._id || "scriptid",
          scriptName: scriptdetails.movieName || "moviename",
          dateofpurchase: scriptdetails.Date || "Date",
          purchasedBy: scriptdetails.userName || "director username",
          WriterId: script.writerId || "Writerid",
        };

        // Find the username associated with the WriterId
        if (scriptDetail.WriterId) {
          const user = await User.findById(scriptDetail.WriterId);
          if (user) {
            scriptDetail.writerUsername = user.userName || "Unknown";
          }
        }

        scriptDetails.push(scriptDetail);
      }
    }

    res.status(200).json(scriptDetails);
  } catch (error) {
    console.error("Error getting script details:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the request parameters

    // Check if the user is already blocked
    const user = await User.findById(userId);
    if (user.blocked) {
      return res.status(200).json({ message: "User is already blocked" });
    }

    // Find the user by ID and update their 'blocked' status to true
    const blockedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: true },
      { new: true } // To get the updated user document
    );

    if (!blockedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the blocked user information in MongoDB
    const blockedUserRecord = new BlockedUser({
      userId: blockedUser._id,
      userName: blockedUser.userName, // Assuming you have a userName field in the schema
      // other relevant information
    });
    await blockedUserRecord.save();

    // Return the updated user with the 'blocked' status set to true
    res.status(200).json({ blockedUser });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the request parameters

    // Find the user by ID and delete their account
    const removedUser = await User.findByIdAndRemove(userId);

    if (!removedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message indicating that the user has been removed
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the request parameters

    // Find the user by ID and update their 'blocked' status to false
    const unblockedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: false },
      { new: true } // To get the updated user document
    );

    if (!unblockedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the blocked user record from the database
    await BlockedUser.deleteOne({ userId: userId }); // Assuming you have a BlockedUser model

    // Return the updated user with the 'blocked' status set to false
    res.status(200).json({ unblockedUser });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getContactDetails = async (req, res, next) => {
  try {
    // Fetch all contact details from the database
    const contacts = await Contact.find();

    // Respond with the fetched contact details
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contact details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.deleteContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Check if the contact form exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact form not found." });
    }

    // If the contact form exists, delete it
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: "Contact form deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact form:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// function to update the readMessage field by ID
exports.updateReadStatus = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Check if the contact form exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact form not found." });
    }

    // Update the readMessage field to true
    contact.readMessage = true;
    await contact.save();

    res.status(200).json({ message: "Read status updated successfully." });
  } catch (error) {
    console.error("Error updating read status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllBlockedUsers = async (req, res) => {
  try {
    // Find all blocked users
    const blockedUsers = await BlockedUser.find();

    // If no blocked users are found, return an appropriate message
    if (blockedUsers.length === 0) {
      return res.status(404).json({ message: "No blocked users found" });
    }

    const updatedBlockedUsers = [];

    // Loop through each blocked user
    for (let i = 0; i < blockedUsers.length; i++) {
      const block = blockedUsers[i];

      // Fetch additional information for each blocked user from the User collection
      const user = await User.findOne({ _id: block.userId });

      if (user) {
        // If user is found and has the role 'director' or 'writer'
        if (user.role.includes("director") || user.role.includes("writer")) {
          let contactNumber = "";
          let imageUrl = "";

          // Get contact number and imageUrl based on role
          if (user.role.includes("director")) {
            const directorProfile = await DirectorProfile.findOne({
              directorId: user._id,
            });
            if (directorProfile) {
              contactNumber = directorProfile.phoneNumber;
              imageUrl = `http://127.0.0.1:8000/api/v1/getProfileImageForDirector/${directorProfile.profilePic}`;
            }
          } else if (user.role.includes("writer")) {
            const writerProfile = await MyProfile.findOne({
              writerId: user._id,
            });
            if (writerProfile) {
              contactNumber = writerProfile.phoneNumber;
              imageUrl = `http://127.0.0.1:8000/api/v1/getProfileImageForWriter/${writerProfile.profilePic}`;
            }
          }

          // Create an object with required details
          const blockedUser = {
            userid: user._id,
            Role: user.role[0],
            userName: user.userName,
            email: user.email,
            contactNumber: contactNumber,
            imageUrl: imageUrl, // Include the imageUrl
          };

          updatedBlockedUsers.push(blockedUser);
        }
      }
    }

    // Return the list of blocked users
    res.status(200).json({ blockedUsers: updatedBlockedUsers });
  } catch (error) {
    console.error("Error retrieving blocked users:", error);
    res.status(500).json({ error: "Server error" });
  }
};
