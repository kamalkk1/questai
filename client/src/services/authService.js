import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const register = async (username, email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};
