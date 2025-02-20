import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username);

  const updateUsername = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/users/update`, { username })
      .then(() => alert("Username updated successfully!"))
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Account Settings</h1>
      <label className="block mt-4">Username</label>
      <input className="border p-2 w-full mb-3" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button className="bg-green-500 text-white p-2 w-full" onClick={updateUsername}>Update</button>

      <label className="block mt-4">Email (cannot be changed)</label>
      <input className="border p-2 w-full mb-3 bg-gray-200" type="text" value={user?.email} disabled />
    </div>
  );
}

export default AccountSettings;
