import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCitiesAndLocations } from "../api-request/location-request";
import { registerUser } from "../api-request/auth-request";
import Swal from "sweetalert2";

export default function SitterRegistration() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [filteredCenterAreas, setFilteredCenterAreas] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getCitiesAndLocations();
    if (response.status) {
      console.log(response);
      setCities(response.data.cities);
      setAreas(response.data.areas);
    } else {
      toast.error("Failed to fetch veterinaries");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cityId") {
      const cityAreas = areas.filter((area) => area.cityId === parseInt(value));
      setFilteredAreas(cityAreas);
      setValue("areaId", "");
    }

    if (name === "centerCityId") {
      const centerAreas = areas.filter((area) => area.cityId === parseInt(value));
      setFilteredCenterAreas(centerAreas);
      setValue("centerAreaId", "");
    }
  };

  function transformToNewFormat(formData) {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNo: formData.phoneNo,
      password: formData.password,
      email: formData.email,
      aadharNo: formData.aadharNo,
      address: formData.address,
      cityId: parseInt(formData.cityId),
      areaId: parseInt(formData.areaId),
      roleId: 3,
      sitter: {
        centerPhoneNo: formData.centerPhoneNo,
        centerAddress: formData.centerAddress,
        cityId: parseInt(formData.centerCityId),
        areaId: parseInt(formData.centerAreaId),
        noOfSlots: parseInt(formData.noOfSlots),
      },
    };
  }

  async function onSubmit(data) {
    console.log("Sitter Registration Data:", data);
    let response = await registerUser(transformToNewFormat(data));
    if (response.status) {
      Swal.fire("Success", "Sitter Register Successfully <br/> Go and Login", "success").then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire("Error", "Error registering Sitter: " + response.message, "error");
      console.error("Error registering user:", response.error);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center my-5 w-50">
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 w-100">
        <h2>Sitter Registration</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="firstName" {...register("firstName", { required: true })} />
            {errors.firstName && <p className="text-danger">First Name is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="lastName" {...register("lastName", { required: true })} />
            {errors.lastName && <p className="text-danger">Last Name is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="phoneNo" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNo"
              {...register("phoneNo", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone Number must be 10 digits",
                },
              })}
            />
            {errors.phoneNo && <p className="text-danger">{errors.phoneNo.message}</p>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be at most 12 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="aadharNo" className="form-label">
              Aadhar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="aadharNo"
              {...register("aadharNo", {
                required: true,
                pattern: {
                  value: /^\d{12}$/,
                  message: "Aadhar Number must be 12 digits",
                },
              })}
            />
            {errors.aadharNo && <p className="text-danger">{errors.aadharNo.message}</p>}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" id="address" {...register("address", { required: true })} />
            {errors.address && <p className="text-danger">Address is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cityId" className="form-label">
              City
            </label>
            <select className="form-select" id="cityId" {...register("cityId", { required: true })} onChange={handleChange}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.cityId && <p className="text-danger">City is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="areaId" className="form-label">
              Area
            </label>
            <select className="form-select" id="areaId" {...register("areaId", { required: true })} disabled={!filteredAreas.length}>
              <option value="">Select Area</option>
              {filteredAreas.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </select>
            {errors.areaId && <p className="text-danger">Area is required</p>}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="centerAddress" className="form-label">
              Center Address
            </label>
            <input type="text" className="form-control" id="centerAddress" {...register("centerAddress", { required: true })} />
            {errors.centerAddress && <p className="text-danger">Center Address is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="centerCityId" className="form-label">
              Center City
            </label>
            <select className="form-select" id="centerCityId" {...register("centerCityId", { required: true })} onChange={handleChange}>
              <option value="">Select Center City</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.centerCityId && <p className="text-danger">Center City is required</p>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="centerAreaId" className="form-label">
              Center Area
            </label>
            <select
              className="form-select"
              id="centerAreaId"
              {...register("centerAreaId", { required: true })}
              disabled={!filteredCenterAreas.length}
            >
              <option value="">Select Center Area</option>
              {filteredCenterAreas.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </select>
            {errors.centerAreaId && <p className="text-danger">Center Area is required</p>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="centerPhoneNo" className="form-label">
              Center Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="centerPhoneNo"
              {...register("centerPhoneNo", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Center Phone Number must be 10 digits",
                },
              })}
            />
            {errors.centerPhoneNo && <p className="text-danger">{errors.centerPhoneNo.message}</p>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="noOfSlots" className="form-label">
              Number of Slots Per Day
            </label>
            <input type="number" className="form-control" id="noOfSlots" {...register("noOfSlots", { required: true, min: {
                  value: 1,
                  message: "Number of Slots Per Day must be at least 1",
                },
                max: {
                  value: 20,
                  message: "Number of Slots Per Day must be at most 20",
                },})} />
            {errors.noOfSlots && <p className="text-danger">Number of Slots Per Day is required</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}