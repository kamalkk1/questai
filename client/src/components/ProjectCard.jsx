import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  // ✅ Add a check to prevent rendering if project is undefined
  if (!project) {
    return <div className="p-4 border rounded-md shadow-md">Loading...</div>;
  }

  return (
    <div
      className="p-4 border rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/upload/${project._id}`)}
    >
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-500">
        {project.episodes?.length || 0} episodes | Last updated:{" "}
        {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "N/A"}
      </p>
    </div>
  );
}

export default ProjectCard;
