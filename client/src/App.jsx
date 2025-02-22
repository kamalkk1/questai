import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadFlow from "./pages/UploadFlow";
import EditTranscript from "./pages/EditTranscript";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/projects" element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } />
  {/* <Route path="/projects" element={
    <PrivateRoute>
      <ProjectCreation />
    </PrivateRoute>
  } /> */}
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
</Routes>

  );
}

export default App;


