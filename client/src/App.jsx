// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ProjectCreation from "./pages/ProjectCreation";
// import UploadFlow from "./pages/UploadFlow";
// import EditTranscript from "./pages/EditTranscript";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
//       <Route path="/projects" element={<PrivateRoute component={ProjectCreation} />} />
//       <Route path="/upload/:id" element={<PrivateRoute component={UploadFlow} />} />
//       <Route path="/edit/:id" element={<PrivateRoute component={EditTranscript} />} />
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectCreation from "./pages/ProjectCreation";
import UploadFlow from "./pages/UploadFlow";
import EditTranscript from "./pages/EditTranscript";

function App() {
  return (
    <Routes>
      {/* Redirect root path to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Main routes without authentication */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectCreation />} />
      <Route path="/upload/:id" element={<UploadFlow />} />
      <Route path="/edit/:id" element={<EditTranscript />} />
    </Routes>
  );
}

export default App;

