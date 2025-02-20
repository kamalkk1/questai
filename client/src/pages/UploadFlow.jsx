import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";

function UploadFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [episodeName, setEpisodeName] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`).then((res) => {
      setProject(res.data);
    });
  }, [id]);

  const addEpisode = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/projects/${id}/episodes`, {
      name: episodeName,
      transcript,
    }).then((res) => {
      setProject(res.data);
      setShowModal(false);
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <Breadcrumb />
        <h1 className="text-2xl font-semibold">{project?.name} - Episodes</h1>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={() => setShowModal(true)}>
          Add Episode
        </button>

        <ul className="mt-4">
          {project?.episodes.map((ep) => (
            <li key={ep._id} className="p-2 border mt-2 cursor-pointer" onClick={() => navigate(`/edit/${ep._id}`)}>
              {ep.name} - {new Date(ep.updatedAt).toLocaleString()}
            </li>
          ))}
        </ul>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2 className="text-xl mb-4">New Episode</h2>
            <input className="border p-2 w-full mb-3" type="text" placeholder="Episode Name" value={episodeName} onChange={(e) => setEpisodeName(e.target.value)} />
            <textarea className="border p-2 w-full mb-3" placeholder="Transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} />
            <button className="bg-green-500 text-white p-2 w-full" onClick={addEpisode}>Create Episode</button>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default UploadFlow;
