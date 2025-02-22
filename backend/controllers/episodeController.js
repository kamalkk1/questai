const mongoose = require("mongoose");
const Episode = require("../models/Episode");
const Project = require("../models/Project");

exports.createEpisode = async (req, res) => {
  try {
    const { name, transcript, uploadType, projectId } = req.body;

    // ✅ Validate projectId format
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID format" });
    }

    // ✅ Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Ensure authenticated user is the project owner
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to this project" });
    }

    // ✅ Create and save new episode
    const episode = new Episode({
      name,
      transcript,
      uploadType,
      project: projectId, // ✅ This is now validated
    });

    await episode.save();
    project.episodes.push(episode._id);
    await project.save();

    res.status(201).json(episode);
  } catch (err) {
    console.error("Error creating episode:", err);
    res.status(500).json({ message: err.message });
  }
};
  

// ✅ Update an episode transcript
exports.updateEpisode = async (req, res) => {
    try {
      const { episodeId } = req.params;
      const { transcript } = req.body;
  
      // ✅ Validate episodeId before querying MongoDB
      if (!mongoose.Types.ObjectId.isValid(episodeId)) {
        return res.status(400).json({ message: "Invalid episode ID format" });
      }
  
      // ✅ Find the episode and ensure it exists
      const episode = await Episode.findById(episodeId).populate("project");
  
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
  
      // ✅ Ensure project exists before checking ownership
      if (!episode.project) {
        return res.status(404).json({ message: "Associated project not found" });
      }
  
      // ✅ Verify ownership through the project
      if (episode.project.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
  
      // ✅ Update transcript
      episode.transcript = transcript;
      await episode.save();
  
      res.json(episode);
    } catch (err) {
      console.error("❌ Error updating episode:", err);
      res.status(500).json({ message: "Server error" });
    }
  };



exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const project = await Project.findById(id)
      .populate('episodes')
      .exec();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// In episodeController.js
// const mongoose = require("mongoose");

exports.getEpisodeById = async (req, res) => {
    try {
        const { episodeId } = req.params; // ✅ Extract episodeId correctly

        // ✅ Validate episodeId before querying MongoDB
        if (!mongoose.Types.ObjectId.isValid(episodeId)) {
            return res.status(400).json({ message: "Invalid episode ID format" });
        }

        // ✅ Fetch the episode and populate project details
        const episode = await Episode.findById(episodeId)
            .populate("project") // Ensure project details are populated
            .exec();

        if (!episode) {
            return res.status(404).json({ message: "Episode not found" });
        }

        // ✅ Ensure project exists before checking ownership
        if (!episode.project) {
            return res.status(404).json({ message: "Associated project not found" });
        }

        // ✅ Verify ownership through the project
        if (episode.project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.json(episode);
    } catch (err) {
        console.error("❌ Error fetching episode:", err);
        res.status(500).json({ message: "Server error" });
    }
};

  


exports.deleteEpisode = async (req, res) => {
  try {
    const episode = await Episode.findByIdAndDelete(req.params.id);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    // Remove episode reference from project
    await Project.findByIdAndUpdate(
      episode.project,
      { $pull: { episodes: episode._id } },
      { new: true }
    );

    res.json({ message: 'Episode deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};