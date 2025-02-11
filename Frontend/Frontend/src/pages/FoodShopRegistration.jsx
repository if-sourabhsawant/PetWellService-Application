import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import Swal from "sweetalert2";
import { getCitiesAndLocations } from "../api-request/location-request";
import { useForm } from "react-hook-form";
import { registerUser } from "../api-request/auth-request";

function FoodShopRegistration() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");

  const fetchFoodShops = async () => {
    try {
      const cityAreaResponse = await getCitiesAndLocations();
      setCities(cityAreaResponse.data.cities);
      setAreas(cityAreaResponse.data.areas);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch food shops", "error");
    }
  };

  useEffect(() => {
    fetchFoodShops();
  }, []);

  function transformToNewFormat(oldObj) {
    return {
      firstName: oldObj.firstName,
      lastName: oldObj.lastName,
      phoneNo: oldObj.phoneNo,
      password: oldObj.password,
      email: oldObj.email,
      aadharNo: oldObj.aadharNo,
      address: oldObj.address,
      cityId: parseInt(oldObj.cityId, 10),
      areaId: parseInt(oldObj.areaId, 10),
      roleId: 6,
      foodShop: {
        shopName: oldObj.shopName,
        shopRegistrationId: oldObj.shopRegistrationId,
        rating: oldObj.rating,
        cityId: parseInt(oldObj.cityId, 10),
        areaId: parseInt(oldObj.areaId, 10),
        shopPhoneNo: oldObj.shopPhoneNo,
        shopAddress: oldObj.shopAddress,
        status: "PENDING",
      },
    };
  }

  const handleCreateFoodShop = async (data) => {
    const requestBody = transformToNewFormat(data);
    console.log(requestBody);

    const response = await registerUser(requestBody);
    if (response.status) {
      Swal.fire("Success", "Food shop created successfully", "success");
      fetchFoodShops();
      reset();
    } else {
      Swal.fire(
        "Error",
        "Failed to create food shop " + response.message,
        "error"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5 w-50">
      <ToastContainer />
      <Form
        onSubmit={handleSubmit(handleCreateFoodShop)}
        className="border p-4 w-100"
      >
        <h2>Food Shop Registration</h2>

        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              {...register("firstName")}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              {...register("lastName")}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="phoneNo" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              className="form-control"
              {...register("phoneNo")}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email")}
            />
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password")}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="aadharNo" className="form-label">
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNo"
              className="form-control"
              {...register("aadharNo")}
            />
          </div>

          <div className="col-md-6  mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="form-control"
              {...register("address")}
            />
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                {...register("shopName")}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Shop Registration ID</Form.Label>
              <Form.Control
                type="text"
                {...register("shopRegistrationId")}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Shop Phone No</Form.Label>
              <Form.Control
                type="text"
                {...register("shopPhoneNo")}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Shop Address</Form.Label>
              <Form.Control
                type="text"
                {...register("shopAddress")}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Select
                {...register("cityId")}
                onChange={(e) => setSelectedCityId(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Area</Form.Label>
              <Form.Select
                {...register("areaId")}
              >
                <option value="">Select Area</option>
                {areas
                  .filter(
                    (area) => area.cityId === parseInt(selectedCityId, 10)
                  )
                  .map((area) => (
                    <option key={area.areaId} value={area.areaId}>
                      {area.areaName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default FoodShopRegistration;