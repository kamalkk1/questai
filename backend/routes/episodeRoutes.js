const express = require("express");
const Episode = require("../models/Episode");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Episode
router.post("/:projectId/episodes", authMiddleware, async (req, res) => {
  const { name, transcript } = req.body;
  const episode = await Episode.create({ name, transcript, project: req.params.projectId });

  await Project.findByIdAndUpdate(req.params.projectId, { $push: { episodes: episode._id }, updatedAt: new Date() });
  res.json(episode);
});

// Get Episode
router.get("/:episodeId", authMiddleware, async (req, res) => {
  const episode = await Episode.findById(req.params.episodeId);
  res.json(episode);
});

module.exports = router;
