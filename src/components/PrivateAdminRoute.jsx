import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateAdminRoute({ children }) {
  const token = useSelector((state) => state.adminAuth.token);

  if (!token) return <Navigate to="/admin-login" replace />;
  return children;
}

export default PrivateAdminRoute;
