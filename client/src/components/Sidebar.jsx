import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Podcast Manager</h2>
      <ul>
        <li className="p-2 hover:bg-gray-700 cursor-pointer"><Link to="/dashboard">Create Podcast</Link></li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/account-settings")}>{user?.username}</li>
      </ul>
      <button className="mt-6 bg-red-500 p-2 w-full" onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
