const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:3000", 
    "http://localhost:5173",  // Local Vite frontend
    "https://questai-one.vercel.app"  // Deployed frontend on Vercel
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // ✅ Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
}));

// ✅ Middleware to set secure headers & prevent MIME errors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");  
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("X-Content-Type-Options", "nosniff");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

// ✅ JSON Middleware
app.use(express.json());

// ✅ Debugging: Log incoming requests
app.use((req, res, next) => {
    console.log(`🔹 ${req.method} request from ${req.headers.origin} to ${req.url}`);
    next();
});

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/episodes", require("./routes/episodeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
