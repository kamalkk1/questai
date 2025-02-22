import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

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
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      
      localStorage.setItem("token", data.token);
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);
      setIsAuthenticated(true);
      return decodedUser;
    } catch (error) {
      logout();
      throw error.response?.data?.message || "Login failed";
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