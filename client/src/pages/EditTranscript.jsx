import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { ArrowLeft } from "lucide-react";

function EditTranscript() {
  const { episodeId } = useParams();
  // debugger;
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newTranscript, setNewTranscript] = useState("");
  const isValidMongoId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  // Fetch episode data
  // Validate episode ID format
  useEffect(() => {
    if (!isValidMongoId(episodeId)) {
      console.error("❌ No valid episodeId found, redirecting...");
      navigate("/projects");
      return;
    }

    console.log("✅ Fetching episode with ID:", episodeId);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found, redirecting to login.");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/episodes/${episodeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Episode data:", res.data);
        setEpisode(res.data);
        setNewTranscript(res.data.transcript);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching episode:", err);
        if (err.response?.status === 400) {
          console.warn("⚠️ Invalid episodeId, redirecting...");
          navigate("/projects");
        }
        if (err.response?.status === 404) {
          console.warn("⚠️ Episode not found, redirecting...");
          navigate("/projects");
        }
        setError("Failed to load episode.");
        setLoading(false);
      });
  }, [episodeId, navigate]);

  const saveTranscript = () => {
    if (!newTranscript.trim() || newTranscript === episode.transcript) return;

    if (!episodeId || episodeId === "undefined") {
      console.error(
        "❌ Error: episodeId is undefined, cannot update transcript."
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found, redirecting to login.");
      navigate("/login");
      return;
    }

    console.log(
      "✅ Sending PUT request to:",
      `${import.meta.env.VITE_API_URL}/api/episodes/${episodeId}`
    );

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/episodes/${episodeId}`,
        { transcript: newTranscript },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("✅ Transcript updated successfully:", res.data);
        setEpisode(res.data);
        setEditing(false);

        // ✅ Ensure the parent component (UploadFlow) updates the episode list
        updateEpisodeInProject(res.data);
      })
      .catch((err) => {
        console.error(
          "❌ Error updating transcript:",
          err.response ? err.response.data : err
        );
      });
  };

  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar (Left Side) */}
      <div className="w-1/4 bg-gray-100 p-4">
        <Sidebar />
      </div>

      {/* ✅ Main Content (Right Side) */}
      <div className="w-3/4 p-6">
        <Breadcrumb />

        {loading ? (
          <p>Loading transcript...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              {/* Back Button and Title */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                <span className="text-2xl font-semibold">Edit Transcript</span>
              </button>

              {/* Buttons on the Right */}
              <div className="flex gap-x-3">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Discard
                    </button>
                    <button
                      onClick={saveTranscript}
                      disabled={newTranscript.trim() === episode?.transcript}
                      className={`px-6 py-2 rounded-lg bg-[#1C1B1F] text-white hover:bg-[#2C2B2F] transition-colors ${
                        newTranscript.trim() === episode?.transcript
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-2 rounded-lg bg-[#1C1B1F] text-white hover:bg-[#2C2B2F] transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              {editing ? (
                <>
                  <div className="mb-4">
                    <div className="text-purple-600 font-medium mb-2">
                      Speaker
                    </div>
                    <textarea
                      className="w-full min-h-[400px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-gray-700 leading-relaxed"
                      value={newTranscript}
                      onChange={(e) => setNewTranscript(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-purple-600 font-medium mb-2">
                    Speaker
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg min-h-[400px] text-gray-700 leading-relaxed">
                    {episode?.transcript || "No transcript available."}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditTranscript;
