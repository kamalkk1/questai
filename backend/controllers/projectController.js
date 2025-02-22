const mongoose = require("mongoose");
const Project = require("../models/Project");

// ✅ Get All Projects for the Authenticated User
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).populate("episodes").exec();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a Specific Project by ID (with validation)
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate projectId format before querying database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid project ID:", id);
      return res.status(400).json({ message: "Invalid project ID format" });
    }

    const project = await Project.findById(id).populate("episodes").exec();

    if (!project) {
      console.warn("Project not found:", id);
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Ensure authenticated user is the project owner
    if (project.user.toString() !== req.user.id) {
      console.warn("Unauthorized access attempt by user:", req.user.id);
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create a New Project
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    // ✅ Validate required fields
    if (!name || name.trim() === "") {
      console.error("Project name is required");
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = new Project({
      name: name.trim(),
      user: req.user.id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update a Project (Only Owner Can Update)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // ✅ Validate projectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid project ID:", id);
      return res.status(400).json({ message: "Invalid project ID format" });
    }

    // ✅ Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Project name cannot be empty" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check if the user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    project.name = name.trim();
    await project.save();

    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a Project (Only Owner Can Delete)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate projectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid project ID:", id);
      return res.status(400).json({ message: "Invalid project ID format" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check if the user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Server error" });
  }
};
