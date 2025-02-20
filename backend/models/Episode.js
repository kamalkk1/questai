const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  transcript: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Episode", EpisodeSchema);
