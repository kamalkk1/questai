const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();


// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",  // For local development (Vite default port)
    "http://localhost:3000",  // For local React dev server
    "https://questai-cftf.onrender.com"  
  ];
const app = express();
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // ✅ Allow cookies and authorization headers
  }));
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/episodes", require("./routes/episodeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
