const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token: No user ID found" });
    }

    // Find the user in the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = { id: user._id.toString() };

    console.log("Authenticated User in Middleware:", req.user);

    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
