import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function UserProtectedRoute({ children, requiredRole }) {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  console.log(location.state);
  if (!isAuthenticated) {
    if (location.pathname.includes("book-appointment")) {
      localStorage.setItem("redirectPath", location.pathname);
    }

    return <Navigate to={`/login`} />;
  }

  if (userInfo?.role?.roleName !== requiredRole) {
    
    return <Navigate to="/unauthorized" />;
  }

  
  return <Outlet />;
}
