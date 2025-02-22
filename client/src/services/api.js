// @ts-nocheck
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// ✅ Helper function for API requests
export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };

  if (token) headers["Authorization"] = `Bearer ${token}`;  // ✅ Fix: Properly format the token

  const options = { 
    method, 
    headers, 
    credentials: "include" // ✅ Ensures cookies (for sessions) are sent
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json(); // ✅ Extract error message
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Request Error:", error.message);
    throw error;
  }
};
