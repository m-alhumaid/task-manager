import React, { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data); // ✅ Store token string directly
      setAuth({ token: res.data, isAuthenticated: true });
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label>Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={form.username}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
