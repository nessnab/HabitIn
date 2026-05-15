import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({
  user,
  loading,
  children
}) {

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;