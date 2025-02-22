import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectCreation from "./pages/ProjectCreation";
import UploadFlow from "./pages/UploadFlow";
import EditTranscript from "./pages/EditTranscript";
import PrivateRoute from "./components/PrivateRoute";
const updateEpisodeInProject = (updatedEpisode) => {
  setProject((prevProject) => ({
    ...prevProject,
    episodes: prevProject.episodes.map((ep) =>
      ep._id === updatedEpisode._id ? updatedEpisode : ep
    ),
  }));
};
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

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import ProjectCreation from "./pages/ProjectCreation";
// import UploadFlow from "./pages/UploadFlow";
// import EditTranscript from "./pages/EditTranscript";
// const updateEpisodeInProject = (updatedEpisode) => {
//   setProject((prevProject) => ({
//     ...prevProject,
//     episodes: prevProject.episodes.map((ep) =>
//       ep._id === updatedEpisode._id ? updatedEpisode : ep
//     ),
//   }));
// };
// function App() {
//   return (
//     <Routes>
//       {/* Redirect root path to dashboard */}
//       <Route path="/" element={<Navigate to="/dashboard" />} />

//       {/* Main routes without authentication */}
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/projects" element={<ProjectCreation />} />
//       <Route path="/upload/:id" element={<UploadFlow />} />
//       <Route path="/edit/:id" element={<EditTranscript updateEpisodeInProject={updateEpisodeInProject}  />} />
//     </Routes>
//   );
// }

// export default App;

