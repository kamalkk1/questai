import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  };
  
  export const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found");
    
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };
  
  export const logoutUser = async () => {
    await axios.post(`${API_URL}/auth/logout`);
  };
