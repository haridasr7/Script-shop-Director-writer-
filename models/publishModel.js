const mongoose = require("mongoose");

const publishSchema = new mongoose.Schema({
  imageFile: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(?![_@!$%#]+$)[a-zA-Z0-9_@!$%# ]+$/.test(value);
      },
      message:
        "Invalid movie name. Only alphanumeric characters, numbers, underscores, @, !, $, %, and # are allowed, but not numbers or symbols alone.",
    },
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  synopsis: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const symbolRegex = /^(?![0-9_@!$%#]+$)[a-zA-Z0-9_@!$%# ]+$/;
        return symbolRegex.test(value);
      },
      message:
        "Invalid synopsis. Only alphanumeric characters, numbers, underscores, @, !, $, %, and # are allowed, but not numbers or symbols alone.",
    },
  },
  genre: {
    type: String,
    enum: [
      "comedy",
      "horror",
      "action",
      "family",
      "romance",
      "thriller",
      "adventure",
      "crime",
      "fantasy",
      "musical",
      "sci-fi",
      "war",
      "animation",
      "drama",
      "film-noir",
      "mystery",
      "short",
      "western",
    ],
    required: true,
  },
 
  scriptType: {
    type: String,
    enum: ["shortFilm", "mainStreamFilm"],
    required: true,
  },
  scriptFile: {
    type: String,
    required: true,
  },
  ispaid: {
    type: Boolean,
    default: false,
  },
  purchasedBy: [
    {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  favoriteScripts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Replace with the actual name of your Script model
    },
  ],
  purchaserUsernames: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: String,
      synopsis: String,
      movieName:String,
      profile:String,
      Date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type:String,
        default:"script Viewed",
      }, 
    },
  ],
  

  directorRatings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DirectorRating",
    },
  ],
});

const Publish = mongoose.model("Publish", publishSchema);

module.exports = Publish;
