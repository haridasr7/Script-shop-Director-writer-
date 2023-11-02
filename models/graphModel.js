const mongoose = require("mongoose");

const graphSchema = new mongoose.Schema({
  writerId: {
    type: String,
    required: true,
  },
  directorId: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  viewDate: {
    type: Date,
    default: Date.now,
  },
});

const Graph = mongoose.model("Graph", graphSchema);

module.exports = Graph;
