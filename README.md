# questai
QuestAI - MERN Stack Application 🚀
QuestAI is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to manage and repurpose podcasts efficiently. The project includes user authentication, podcast project creation, episode management, and transcription editing with a smooth and responsive UI.

Login Using
username: test2example.com
password: validpassword

🔹 Tech Stack
Frontend: React (Vite) + TailwindCSS + ShadCN
Backend: Node.js, Express.js, MongoDB (Mongoose)
Authentication: JWT (JSON Web Tokens)
State Management: React Context API
Deployment:
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
📌 Features
✅ User Authentication
Login & Logout with JWT-based authentication.
Secure token handling (stored only in local storage for authentication).
✅ Podcast Project Management
Create, edit, and delete podcast projects.
List all projects and display episodes related to each.
✅ Episode Management
Upload episodes via File Upload, YouTube, or RSS Feed.
Edit episode transcriptions dynamically.
Delete episodes securely.
✅ Optimized Database Queries
Mongoose .populate() used to fetch related project & episode data efficiently.
Indexed queries for faster data retrieval.
✅ Breadcrumb Navigation
Dynamic breadcrumbs displaying project names instead of IDs for better navigation.
✅ Performance & Security
CORS properly configured to allow frontend-backend communication.
API requests are structured using a reusable apiRequest.js helper function.
Minimal localStorage usage (only for authentication tokens).