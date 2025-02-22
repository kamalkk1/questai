import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // @ts-nocheck
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsAuthenticated(true);

        return decodedUser;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      logout(); // ✅ Ensure state is cleared on failed login
      console.error("Login Error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const authContextValue = useMemo(() => ({
    user, 
    isAuthenticated, 
    login, 
    logout,
    loading 
  }), [user, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading authentication state...</div> : children}
    </AuthContext.Provider>
  );
};