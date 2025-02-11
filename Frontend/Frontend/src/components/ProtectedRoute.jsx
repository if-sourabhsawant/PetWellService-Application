import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProtectedRoute({ requiredRole }) {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire("Not Login", "You Not Login Please Login or Register", "error").then(() => {});
      navigate("/login", { replace: true });
      return;
    }
    if (userInfo?.role?.roleName !== requiredRole) {
      Swal.fire("Authorize Access", "You Not Right to Access the Page", "error").then(() => {
        navigate(-1, { replace: true });
      });
      return;
    }
    setIsLoading(false);
  }, []);

  return isLoading ? <>Loading...</> : <Outlet />;
}
