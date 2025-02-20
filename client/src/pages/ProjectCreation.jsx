import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCreation() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  // Fetch projects from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Create project and navigate to Upload Flow
  const createProject = async () => {
    if (!projectName.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName }),
      });

      const newProject = await res.json();
      setProjects([...projects, newProject]); // Update state with new project
      setProjectName("");
      navigate(`/upload/${newProject._id}`); // Redirect to Upload Flow
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Projects</h1>
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={createProject}>
          Create
        </button>
      </div>

      <ul className="mt-6">
        {projects.map((proj) => (
          <li
            key={proj._id}
            className="p-2 border mt-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/upload/${proj._id}`)}
          >
            {proj.name} - {proj.episodes?.length || 0} Episodes - Last Updated:{" "}
            {proj.updatedAt ? new Date(proj.updatedAt).toLocaleString() : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectCreation;
