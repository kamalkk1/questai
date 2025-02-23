import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  // ✅ Handle missing project gracefully
  if (!project || !project._id) {
    return <div className="p-4 border rounded-md shadow-md">Loading project....</div>;
  }

  // ✅ Ensure `updatedAt` is formatted correctly
  const formattedDate = project.updatedAt 
    ? new Date(project.updatedAt).toLocaleString() 
    : "N/A";

  return (
    <div
      className="p-4 border rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/upload/${project._id}`)} // ✅ Corrected URL format
    >
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-500">
        {project.episodes?.length || 0} episodes | Last updated: {formattedDate}
      </p>
    </div>
  );
}

export default ProjectCard;
