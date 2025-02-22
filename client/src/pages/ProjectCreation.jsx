import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectCreation() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  // Fetch projects from backend with authentication
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle unauthorized (redirect to login)
        if (error.response?.status === 401) navigate("/login");
      }
    };
    fetchProjects();
  }, []);

  // Create project with proper API integration
  const createProject = async () => {
    if (!projectName.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        { name: projectName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProjects([...projects, res.data]);
      setProjectName("");
      navigate(`/upload/${res.data._id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response?.status === 401) navigate("/login");
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
          onKeyPress={(e) => e.key === "Enter" && createProject()}
        />
        <button 
          className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors"
          onClick={createProject}
        >
          Create Project
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {projects.map((proj) => (
          <li
            key={proj._id}
            className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => navigate(`/upload/${proj._id}`)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{proj.name}</span>
              <span className="text-sm text-gray-500">
                {proj.episodes?.length || 0} episodes
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Last updated: {new Date(proj.updatedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectCreation;