import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { getCitiesAndLocations } from "../api-request/location-request";
import { registerUser } from "../api-request/auth-request";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VeterinaryRegistration() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [filteredHospitalAreas, setFilteredHospitalAreas] = useState([]);

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

  async function onSubmit(data) {
    console.log("Veterinary Registration Data:", data);
    let response = await registerUser(transformToNewFormat(data));
    if (response.status) {
      Swal.fire("Success", "Veterinary Register Successfully <br/> Go and Login", "success").then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire("Error", "Error registering Veterinary: " + response.message, "error");
      console.error("Error registering user:", response.error);
    }
  }

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const cityAreas = areas.filter((area) => area.cityId === parseInt(cityId));
    setFilteredAreas(cityAreas);
    setValue("areaId", "");
  };

  const handleHospitalCityChange = (e) => {
    const cityId = e.target.value;
    const cityAreas = areas.filter((area) => area.cityId === parseInt(cityId));
    setFilteredHospitalAreas(cityAreas);
    setValue("hospitalAreaId", "");
  };

  function transformToNewFormat(oldObj) {
    return {
      firstName: oldObj.firstName,
      lastName: oldObj.lastName,
      phoneNo: oldObj.phoneNo,
      password: oldObj.password,
      email: oldObj.email,
      aadharNo: oldObj.aadharNo,
      address: oldObj.address,
      cityId: parseInt(oldObj.cityId),
      areaId: parseInt(oldObj.areaId),
      roleId: 2,
      veterinary: {
        specialization: oldObj.specialization,
        experience: parseFloat(oldObj.experience),
        licenseNo: oldObj.licenseNo,
        cityId: parseInt(oldObj.hospitalCityId),
        areaId: parseInt(oldObj.hospitalAreaId),
        clinicName: oldObj.clinicName,
        clinicPhoneNo: oldObj.clinicPhoneNo,
        clinicAddress: oldObj.clinicAddress,
        noOfSlots: parseInt(oldObj.noOfSlots),
      },
    };
  }

  return (
    <div className="container d-flex justify-content-center align-items-center my-5 w-50">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 w-100">
        <h2>Veterinary Registration</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="firstName" {...register("firstName", { required: true })} />
            {errors.firstName && <span className="text-danger">First Name is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="lastName" {...register("lastName", { required: true })} />
            {errors.lastName && <span className="text-danger">Last Name is required</span>}
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
            {errors.phoneNo && <span className="text-danger">{errors.phoneNo.message}</span>}
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
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          <div className="col-md-12 mb-3">
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
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
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
            {errors.aadharNo && <span className="text-danger">{errors.aadharNo.message}</span>}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" id="address" {...register("address", { required: true })} />
            {errors.address && <span className="text-danger">Address is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cityId" className="form-label">
              City
            </label>
            <select className="form-select" id="cityId" {...register("cityId", { required: true })} onChange={handleCityChange}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.cityId && <span className="text-danger">City is required</span>}
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
            {errors.areaId && <span className="text-danger">Area is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="specialization" className="form-label">
              Specialization
            </label>
            <select className="form-control" id="specialization" {...register("specialization", { required: true })}>
              <option value="">Select Specialization</option>
              <option value="Small Animal Surgery">Small Animal Surgery</option>
              <option value="Veterinary Dermatology">Veterinary Dermatology</option>
              <option value="Veterinary Internal Medicine">Veterinary Internal Medicine</option>
              <option value="Veterinary Oncology">Veterinary Oncology</option>
              <option value="Veterinary Cardiology">Veterinary Cardiology</option>
              <option value="Equine Medicine">Equine Medicine</option>
              <option value="Veterinary Neurology">Veterinary Neurology</option>
              <option value="Veterinary Ophthalmology">Veterinary Ophthalmology</option>
              <option value="Exotic Animal Medicine">Exotic Animal Medicine</option>
              <option value="Zoo and Wildlife Medicine">Zoo and Wildlife Medicine</option>
            </select>
            {errors.specialization && <span className="text-danger">Specialization is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="experience" className="form-label">
              Experience (in years)
            </label>
            <input
              type="number"
              className="form-control"
              id="experience"
              {...register("experience", {
                required: true,
                min: {
                  value: 1,
                  message: "Experience must be at least 1 year",
                },
                max: {
                  value: 30,
                  message: "Experience must be less than 30 years",
                },
              })}
            />
            {errors.experience && <span className="text-danger">{errors.experience.message}</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="clinicName" className="form-label">
              Clinic Name
            </label>
            <input type="text" className="form-control" id="clinicName" {...register("clinicName", { required: true })} />
            {errors.clinicName && <span className="text-danger">Clinic Name is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="clinicPhoneNo" className="form-label">
              Clinic Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="clinicPhoneNo"
              {...register("clinicPhoneNo", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Clinic Phone Number must be 10 digits",
                },
              })}
            />
            {errors.clinicPhoneNo && <span className="text-danger">{errors.clinicPhoneNo.message}</span>}
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="clinicAddress" className="form-label">
              Clinic Address
            </label>
            <input type="text" className="form-control" id="clinicAddress" {...register("clinicAddress", { required: true })} />
            {errors.clinicAddress && <span className="text-danger">Clinic Address is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="hospitalCityId" className="form-label">
              Hospital City
            </label>
            <select
              className="form-select"
              id="hospitalCityId"
              {...register("hospitalCityId", { required: true })}
              onChange={handleHospitalCityChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.hospitalCityId && <span className="text-danger">City is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="hospitalAreaId" className="form-label">
              Hospital Area
            </label>
            <select
              className="form-select"
              id="hospitalAreaId"
              {...register("hospitalAreaId", { required: true })}
              disabled={!filteredHospitalAreas.length}
            >
              <option value="">Select Area</option>
              {filteredHospitalAreas.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </select>
            {errors.hospitalAreaId && <span className="text-danger">Area is required</span>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="licenseNo" className="form-label">
              License Number
            </label>
            <input type="text" className="form-control" id="licenseNo" {...register("licenseNo", { required: true })} />
            {errors.licenseNo && <span className="text-danger">License Number is required</span>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="noOfSlots" className="form-label">
              Number of Slots Per Day
            </label>
            <input
              type="number"
              className="form-control"
              id="noOfSlots"
              {...register("noOfSlots", {
                required: true,
                max: {
                  value: 10,
                  message: "Number of Slots Per Day must be 10 or less",
                },
              })}
            />
            {errors.noOfSlots && <span className="text-danger">{errors.noOfSlots.message}</span>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}