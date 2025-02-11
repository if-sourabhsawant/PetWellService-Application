import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { getCitiesAndLocations } from "../api-request/location-request";
import { getAllPetsCategoriesAndBreeds } from "../api-request/pets-request";
import { registerUser } from "../api-request/auth-request";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const UserRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCityId = watch("cityId"); 

  function transformToNewFormat(oldObj) {
    return {
      firstName: oldObj.firstName,
      lastName: oldObj.lastName,
      phoneNo: oldObj.phoneNo,
      password: oldObj.password,
      email: oldObj.email,
      aadharNo: oldObj.aadharNo,
      address: oldObj.address,
      cityId: oldObj.cityId,
      areaId: oldObj.areaId,
      roleId: 1,
      pet: {
        petName: oldObj.petName,
        petAge: oldObj.petAge,
        categoryId: oldObj.categoryId,
      },
    };
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(params) {
    setLoading(true);
    const response = await getCitiesAndLocations();
    if (response.status) {
      console.log(response);
      setCities(response.data.cities);
      setAreas(response.data.areas);
    } else {
      toast.error("Failed to fetch veterinaries");
    }
    const response1 = await getAllPetsCategoriesAndBreeds();
    if (response1.status) {
      console.log(response1);
      setCategories(response1.data.categories);
    } else {
      toast.error("Failed to fetch veterinaries");
    }

    setLoading(false);
  }

  
  useEffect(() => {
    if (selectedCityId) {
      const filtered = areas.filter((area) => area.cityId === parseInt(selectedCityId));
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas([]);
    }
  }, [selectedCityId, areas]);

  async function onSubmit(data) {
    console.log("User Registration Data:", data);
    let response = await registerUser(transformToNewFormat(data));
    if (response.status) {
      Swal.fire("Success", "User Register Successfully <br/> Go and Login", "success").then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire("Error", "Error registering user: " + response.message, "error");
      console.error("Error registering user:", response.error);
    }
  }

  return (
    !loading && (
      <div className="container d-flex justify-content-center align-items-center my-5 w-50">
        <ToastContainer />

        <form onSubmit={handleSubmit(onSubmit)} className="border p-4 w-100">
          <h3>User Registration</h3>
          <div className="row">
            
           {/* <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input type="text" id="firstName" className="form-control" {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="firstName" className="form-label">
    First Name
  </label>
  <input
    type="text"
    id="firstName"
    className="form-control"
    {...register("firstName", {
      required: "First name is required",
      minLength: { value: 2, message: "Must be at least 2 characters" },
      maxLength: { value: 30, message: "Must not exceed 30 characters" },
      pattern: { value: /^[A-Za-z]+$/, message: "Only letters are allowed" },
    })}
  />
  {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
</div>

            
            {/* <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input type="text" id="lastName" className="form-control" {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="lastName" className="form-label">
    Last Name
  </label>
  <input
    type="text"
    id="lastName"
    className="form-control"
    {...register("lastName", {
      required: "Last name is required",
      minLength: { value: 2, message: "Must be at least 2 characters" },
      maxLength: { value: 30, message: "Must not exceed 30 characters" },
      pattern: { value: /^[A-Za-z]+$/, message: "Only letters are allowed" },
    })}
  />
  {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
</div>


            
            {/* <div className="col-md-6 mb-3">
              <label htmlFor="phoneNo" className="form-label">
                Phone Number
              </label>
              <input type="text" id="phoneNo" className="form-control" {...register("phoneNo", { required: "Phone number is required" })} />
              {errors.phoneNo && <small className="text-danger">{errors.phoneNo.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="phoneNo" className="form-label">
    Phone Number
  </label>
  <input
    type="text"
    id="phoneNo"
    className="form-control"
    {...register("phoneNo", {
      required: "Phone number is required",
      pattern: {
        value: /^[1-9][0-9]{9}$/, // Ensures the first digit is not 0
        message: "Phone number must be exactly 10 digits and cannot start with 0",
      },
    })}
  />
  {errors.phoneNo && <small className="text-danger">{errors.phoneNo.message}</small>}
</div>


            {/* <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" id="email" className="form-control" {...register("email", { required: "Email is required" })} />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="email" className="form-label">
    Email
  </label>
  <input
    type="email"
    id="email"
    className="form-control"
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        message: "Only @gmail.com addresses are allowed",
      },
    })}
  />
  {errors.email && <small className="text-danger">{errors.email.message}</small>}
</div>


            
            {/* <div className="col-md-12 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" id="password" className="form-control" {...register("password", { required: "Password is required" })} />
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div> */}

<div className="col-md-12 mb-3">
  <label htmlFor="password" className="form-label">
    Password
  </label>
  <input
    type="password"
    id="password"
    className="form-control"
    {...register("password", {
      required: "Password is required",
      minLength: { value: 8, message: "Password must be at least 8 characters" },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      },
    })}
  />
  {errors.password && <small className="text-danger">{errors.password.message}</small>}
</div>


            

            
            {/* <div className="col-md-6 mb-3">
              <label htmlFor="aadharNo" className="form-label">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNo"
                className="form-control"
                {...register("aadharNo", {
                  required: "Aadhar number is required",
                })}
              />
              {errors.aadharNo && <small className="text-danger">{errors.aadharNo.message}</small>}
            </div> */}
            <div className="col-md-6 mb-3">
  <label htmlFor="aadharNo" className="form-label">
    Aadhar Number
  </label>
  <input
    type="text"
    id="aadharNo"
    className="form-control"
    {...register("aadharNo", {
      required: "Aadhar number is required",
      pattern: {
        value: /^[2-9]{1}[0-9]{11}$/,
        message: "Aadhar number must be a valid 12-digit number",
      },
    })}
    maxLength={12}
  />
  {errors.aadharNo && <small className="text-danger">{errors.aadharNo.message}</small>}
</div>


            
            {/* <div className="col-md-6  mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input type="text" id="address" className="form-control" {...register("address", { required: "Address is required" })} />
              {errors.address && <small className="text-danger">{errors.address.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="address" className="form-label">
    Address
  </label>
  <input
    type="text"
    id="address"
    className="form-control"
    {...register("address", {
      required: "Address is required",
      minLength: { value: 5, message: "Address must be at least 5 characters" },
      maxLength: { value: 100, message: "Address cannot exceed 100 characters" },
      pattern: {
        value: /^[a-zA-Z0-9\s,.-]+$/,
        message: "Invalid address format",
      },
    })}
  />
  {errors.address && <small className="text-danger">{errors.address.message}</small>}
</div>

            
            <div className="col-md-6 mb-3">
              <label htmlFor="cityId" className="form-label">
                City
              </label>
              <select id="cityId" className="form-select" {...register("cityId", { required: "City is required" })}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </option>
                ))}
              </select>
              {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
            </div>

           {/* <div className="col-md-6 mb-3">
  <label htmlFor="cityId" className="form-label">
    City
  </label>
  <select
    id="cityId"
    className="form-select"
    {...register("cityId", { required: "City is required" })}
  >
    <option value="" disabled>
      Select City
    </option>
    {cities.map((city) => (
      <option key={city.cityId} value={city.cityId}>
        {city.cityName}
      </option>
    ))}
  </select>
  {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
</div> */}


            
            <div className="col-md-6  mb-3">
              <label htmlFor="areaId" className="form-label">
                Area
              </label>
              <select id="areaId" className="form-select" {...register("areaId", { required: "Area is required" })}>
                <option value="">Select Area</option>
                {filteredAreas.map((area) => (
                  <option key={area.areaId} value={area.areaId}>
                    {area.areaName}
                  </option>
                ))}
              </select>
              {errors.areaId && <small className="text-danger">{errors.areaId.message}</small>}
            </div>

{/* <div className="col-md-6 mb-3">
  <label htmlFor="areaId" className="form-label">
    Area
  </label>
  <select
    id="areaId"
    className="form-select"
    {...register("areaId", { required: "Area is required" })}
  >
    <option value="" disabled>
      Select Area
    </option>
    {filteredAreas.map((area) => (
      <option key={area.areaId} value={area.areaId}>
        {area.areaName}
      </option>
    ))}
  </select>
  {errors.areaId && <small className="text-danger">{errors.areaId.message}</small>}
</div>
 */}

            
            {/* <div className="col-md-6 mb-3">
              <label htmlFor="petName" className="form-label">
                Pet Name
              </label>
              <input type="text" id="petName" className="form-control" {...register("petName", { required: "Pet name is required" })} />
              {errors.petName && <small className="text-danger">{errors.petName.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="petName" className="form-label">
    Pet Name
  </label>
  <input
    type="text"
    id="petName"
    className="form-control"
    {...register("petName", {
      required: "Pet name is required",
      minLength: { value: 2, message: "Pet name must be at least 2 characters" },
      maxLength: { value: 30, message: "Pet name cannot exceed 30 characters" },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Only letters and spaces are allowed",
      },
    })}
  />
  {errors.petName && <small className="text-danger">{errors.petName.message}</small>}
</div>


            
            {/* <div className="col-md-6 mb-3">
              <label htmlFor="petAge" className="form-label">
                Pet Age
              </label>
              <input type="number" id="petAge" className="form-control" {...register("petAge", { required: "Pet age is required" })} />
              {errors.petAge && <small className="text-danger">{errors.petAge.message}</small>}
            </div> */}

<div className="col-md-6 mb-3">
  <label htmlFor="petAge" className="form-label">
    Pet Age
  </label>
  <input
    type="number"
    id="petAge"
    className="form-control"
    {...register("petAge", {
      required: "Pet age is required",
      min: { value: 0, message: "Age must be 0 or greater" },
      max: { value: 30, message: "Age cannot exceed 30 years" },
      pattern: {
        value: /^[1-9]+$/,
        message: "Only whole numbers are allowed",
      },
    })}
  />
  {errors.petAge && <small className="text-danger">{errors.petAge.message}</small>}
</div>


            
            <div className="col-md-6 mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select id="categoryId" className="form-select" {...register("categoryId", { required: "Category is required" })}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}
            </div>
            {/* <div className="col-md-6 mb-3">
  <label htmlFor="categoryId" className="form-label">
    Category
  </label>
  <select
    id="categoryId"
    className="form-select"
    {...register("categoryId", { required: "Category is required" })}
  >
    <option value="" disabled>
      Select Category
    </option>
    {categories.map((category) => (
      <option key={category.categoryId} value={category.categoryId}>
        {category.categoryName}
      </option>
    ))}
  </select>
  {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}
</div>
 */}

            
           
          </div>

          
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    )
  );
};

export default UserRegistration;
