import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const ProtectedRoute = ({ element }) => {
  const { setMessage } = useFlashMessage();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    setMessage("Please log in to access this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "Admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (role === "Student") {
    return <Navigate to="/dashboard/student" replace />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
