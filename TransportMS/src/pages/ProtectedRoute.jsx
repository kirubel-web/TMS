// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/not-found" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    const isAuthorized = decoded.role === requiredRole;

    return isAuthorized ? children : <Navigate to="/not-found" replace />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/not-found" replace />;
  }
}
