import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";

function EditTranscript() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newTranscript, setNewTranscript] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/episodes/${id}`).then((res) => {
      setEpisode(res.data);
      setNewTranscript(res.data.transcript);
    });
  }, [id]);

  const saveTranscript = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/episodes/${id}`, { transcript: newTranscript }).then((res) => {
      setEpisode(res.data);
      setEditing(false);
    });
  };

  return (
    <div className="p-6">
      <Breadcrumb />
      <button className="bg-gray-500 text-white px-4 py-2 mb-4" onClick={() => navigate(-1)}>Back</button>
      <h1 className="text-2xl">{episode?.name} - Transcript</h1>

      {editing ? (
        <>
          <textarea className="border p-2 w-full mb-3" value={newTranscript} onChange={(e) => setNewTranscript(e.target.value)} />
          <button className="bg-green-500 text-white px-4 py-2" onClick={saveTranscript}>Save</button>
          <button className="ml-2 bg-red-500 text-white px-4 py-2" onClick={() => setEditing(false)}>Discard</button>
        </>
      ) : (
        <>
          <p className="border p-4">{episode?.transcript}</p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default EditTranscript;
