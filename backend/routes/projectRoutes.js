const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// ✅ Create Project
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Project name is required" });
    }

    // Create project with an initial timestamp
    const project = await Project.create({ 
      name, 
      updatedAt: new Date() 
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ✅ Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("episodes");
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ✅ Get a Single Project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("episodes");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// ✅ Delete a Project by ID
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
