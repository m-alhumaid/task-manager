import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = () => {
    setLoggingOut(true);
    localStorage.removeItem("token");
    setAuth({ token: null, isAuthenticated: false });
    navigate("/login");
    setLoggingOut(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TaskManager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav gap-2">
            {isAuthenticated ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={logout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-light btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
