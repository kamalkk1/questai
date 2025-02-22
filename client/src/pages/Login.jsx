import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/projects");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 h-screen">
        <div className="flex flex-col md:flex-row items-center justify-center h-full gap-8">
          {/* Branding Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-purple-600 mb-4">
                Quees.AI
              </h1>
              <div className="space-y-4 text-gray-700">
                <p className="text-3xl font-semibold">Your podcast</p>
                <p className="text-3xl font-semibold">will no longer</p>
                <p className="text-3xl font-semibold">be just a hobby.</p>
                <p className="text-xl mt-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold">
                  Supercharge Your Distribution
                </p>
                <p className="text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold">
                  using our AI assistant!
                </p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="md:w-1/2 max-w-md w-full">
            <form
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-semibold text-center">
                {" "}
                Welcome to <br />
                <span className="text-[#8B5CF6]">Ques</span>
                <span className="text-black">.AI</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    type="email"
                    placeholder="test@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    type="password"
                    placeholder="validpassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  type="submit"
                >
                  Unlock Your Dashboard
                </button>
              </div>

              <div className="mt-6 text-center space-y-3">
                <Link
                  to="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Forgot Password?
                </Link>
                <p className="text-gray-600 text-sm">
                  New here?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Start your podcast journey
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
