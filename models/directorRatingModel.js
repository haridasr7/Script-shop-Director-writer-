// directorRatingModel.js

const mongoose = require("mongoose");

const directorRatingSchema = new mongoose.Schema({
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
    required: true,
  },
  script: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publish",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const DirectorRating = mongoose.model("DirectorRating", directorRatingSchema);

module.exports = DirectorRating;
