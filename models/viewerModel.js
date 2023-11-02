const mongoose = require("mongoose");

const viewerSchema = new mongoose.Schema({
  scriptId: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  movieName:{
    type: String,
  },
  directorspurchased: {
    type: Number,
    default: 0,
  },
  Addedtofavourites: {
    type: Number,
    default: 0,
  },


});

const Viewer = mongoose.model("Viewer", viewerSchema);

module.exports = Viewer;
