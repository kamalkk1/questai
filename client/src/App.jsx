import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadFlow from "./pages/UploadFlow";
import EditTranscript from "./pages/EditTranscript";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Root path redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      <Route path="/projects" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path="/upload/:projectId" element={
        <PrivateRoute>
          <UploadFlow />
        </PrivateRoute>
      } />

      <Route path="/edit/:episodeId" element={
        <PrivateRoute>
          <EditTranscript />
        </PrivateRoute>
      } />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;


