const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Update Username
router.put("/update", authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { username: req.body.username });
  res.json({ message: "Username updated successfully" });
});

module.exports = router;
