import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import api from "./services/api";

// Create AuthContext
export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    return {
      token,
      isAuthenticated: !!token,
    };
  });

  // Attach token to Axios on load/update
  useEffect(() => {
    if (auth.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
