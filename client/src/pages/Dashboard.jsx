import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Bell, Plus } from "lucide-react";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch projects from backend when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // ✅ Create new project in backend & update state
  const handleCreateProject = async (name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const newProject = await res.json();
      setProjects([...projects, newProject]); // Update projects list
      setIsModalOpen(false);
      navigate(`/upload/${newProject._id}`); // Navigate to Upload Flow
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-purple-600 font-bold">Ques.AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-purple-600">Projects</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Project
          </Button>
        </div>

        {/* ✅ Show project list or empty state */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Project
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
