import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api-request/auth-request";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const url = {
    1: "/user/dashboard",
    2: "/veterinary/dashboard",
    3: "/sitter/dashboard",
    4: "/groomer/dashboard",
    5: "/admin/dashboard",
  };
  const location = useLocation();
  const handleLogin = async (data) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      if (response.status) {
        console.log(response.data);
        dispatch(login({ ...response.data, dashboardUrl: url[response.data.role.roleId] }));
        toast.success("Login successful");
        console.log(location.state);

        navigate(url[response.data.role.roleId]);
      } else {
        console.error("Failed to Login", response);
        toast.error("Failed to login " + response.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Error logging in");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    !isAuthenticated && (
      <div className="container d-flex justify-content-center align-items-center my-5 w-50">
        <form onSubmit={handleSubmit(handleLogin)} className="border p-4 w-100">
          <h2>Login</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <ToastContainer />
      </div>
    )
  );
};

export default Login;