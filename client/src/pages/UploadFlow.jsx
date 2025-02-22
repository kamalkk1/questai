import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import { FilesTable } from "@/components/FilesTable";
import { UploadOptionCard } from "@/components/UploadOptionCard";
import { Rss, Upload, X, Youtube } from "lucide-react";

function UploadFlow() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [episodeName, setEpisodeName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [selectedUploadType, setSelectedUploadType] = useState("");
  // console.log("Extracted projectId from URL:", projectId);
  // ✅ Function to validate MongoDB ObjectId (24-character hex string)
  const isValidMongoId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!projectId) {
          console.error("No projectId found, redirecting...");
          navigate("/projects");
          return;
        }

        // ✅ Validate projectId using regex
        if (!isValidMongoId(projectId)) {
          console.error("Invalid projectId:", projectId);
          navigate("/projects");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login.");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Add auth header
          }
        );

        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        if (err.response?.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        } else if (err.response?.status === 404) {
          navigate("/projects"); // Redirect if project not found
        }
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  const openModal = (uploadType) => {
    setSelectedUploadType(uploadType);
    setShowModal(true);
  };

  const addEpisode = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/episodes`,
        {
          name: episodeName,
          transcript,
          uploadType: selectedUploadType,
          projectId, // ✅ Use projectId instead of id
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Add auth header
        }
      );

      // Refresh project data after adding episode
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProject(res.data);

      setShowModal(false);
      setEpisodeName("");
      setTranscript("");
    } catch (err) {
      console.error("Error adding episode:", err);
      if (err.response?.status === 401) {
        navigate("/login"); // Redirect to login if unauthorized
      }
    }
  };

  const handleView = (episodeId) => {
    if (!episodeId || episodeId === "undefined") {
      console.error("❌ Error: episodeId is undefined, cannot navigate.");
      return;
    }

    console.log("✅ Navigating to edit page with episodeId:", episodeId);
    navigate(`/edit/${episodeId}`); // ✅ Ensure episodeId is passed correctly
  };

  const handleDelete = async (episodeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/episodes/${episodeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          },
        }
      );

      // ✅ Refresh project data after deletion
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          },
        }
      );

      setProject(res.data);
      console.log("Episode deleted successfully");
    } catch (err) {
      console.error("Error deleting episode:", err);
      if (err.response?.status === 401) {
        console.warn("Unauthorized: Redirecting to login.");
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 ">
        <Sidebar />
      </div>
      <div className="p-6 w-3/4">
        <Breadcrumb />
        <h1 className="text-2xl font-semibold"> Add Podcast</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
          <UploadOptionCard
            title="RSS Feed"
            description="Import episodes from an RSS feed."
            icon={<Rss className="w-10 h-10 text-purple-600" />}
            onClick={() => openModal("RSS Feed")}
          />

          <UploadOptionCard
            title="YouTube Video"
            description="Convert YouTube videos to podcast episodes."
            icon={<Youtube className="w-10 h-10 text-red-600" />}
            onClick={() => openModal("YouTube Video")}
          />

          <UploadOptionCard
            title="Upload Files"
            description="Upload MP3 or WAV files."
            icon={<Upload className="w-10 h-10 text-blue-600" />}
            onClick={() => openModal("File Upload")}
          />
        </div>

        <div className="mt-4">
          {project?.episodes?.length > 0 ? (
            <FilesTable
              files={project.episodes.map((ep) => ({
                id: ep._id,
                name: ep.name,
                updatedAt: ep.updatedAt,
              }))}
              onView={handleView}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-500 mt-4">No episodes found.</p>
          )}
        </div>

        {/* {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2 className="text-xl mb-4">New Episode ({selectedUploadType})</h2>
            <input
              className="border p-2 w-full mb-3"
              type="text"
              placeholder="Episode Name"
              value={episodeName}
              onChange={(e) => setEpisodeName(e.target.value)}
            />
            <textarea
              className="border p-2 w-full mb-3"
              placeholder="Transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 w-full"
              onClick={addEpisode}
            >
              Create Episode
            </button>
          </Modal>
        )} */}
         {showModal && (
          <Modal>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-500 p-2 rounded-full">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900">Upload from Youtube</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="ml-auto hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
    
              <div className="space-y-6">
                <div>
                  <label className="block text-lg mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Enter episode name"
                    value={episodeName}
                    onChange={(e) => setEpisodeName(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-lg mb-2">Transcript</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[200px] resize-none"
                    placeholder="Enter transcript"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                </div>
    
                <div className="flex justify-end pt-4">
                  <button
                    onClick={addEpisode}
                    className="px-8 py-3 bg-[#1C1B1F] text-white rounded-lg hover:bg-[#2C2B2F] transition-colors text-base font-medium"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Modal>)}
      </div>
    </div>
  );
}

export default UploadFlow;
