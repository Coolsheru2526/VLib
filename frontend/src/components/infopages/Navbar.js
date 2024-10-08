import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Clear role on logout
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            VLib
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              {isLoggedIn && userRole && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname.startsWith("/dashboard") ? "active" : ""
                    }`}
                    to={`/dashboard/${userRole}`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isLoggedIn && userRole === "Admin" && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/addBook" ? "active" : ""
                    }`}
                    to="/addBook"
                  >
                    Add 
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex">
              {!isLoggedIn ? (
                <>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/signup"
                    role="button"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button className="btn btn-danger mx-1" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
