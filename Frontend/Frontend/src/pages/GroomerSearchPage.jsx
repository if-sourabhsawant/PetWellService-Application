import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { getAllGroomers } from "../api-request/groomer-request";
import { getCitiesAndLocations } from "../api-request/location-request";

export default function GroomerSearchPage() {
  const [groomers, setGroomers] = useState([]);
  const [filteredGroomers, setFilteredGroomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getAllGroomers();
    const response1 = await getCitiesAndLocations();
    console.log(response1);
    console.log(response);

    if (response.status) {
      console.log(response);

      setGroomers(response.data);
      setFilteredGroomers(response.data);
    } else {
      toast.error("Failed to fetch veterinaries");
    }

    if (response1.status) {
      setCities(response1.data.cities);
      setAreas(response1.data.areas);
    }
  }
  
  useEffect(() => {
    let result = groomers;

    if (searchQuery) {
      result = result.filter((groomer) => groomer.shopName.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCity) {
      result = result.filter((groomer) => groomer.city.cityId === parseInt(selectedCity));
    }

    if (selectedArea) {
      result = result.filter((groomer) => groomer.area.areaId === parseInt(selectedArea));
    }

    setFilteredGroomers(result);
  }, [searchQuery, selectedCity, selectedArea, groomers]);

  function handleBookAppointment(id) {
    console.log(id);

    navigate(`/user/appointments/groomer/${id}`);
  }
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Search and Filter Groomers</h3>
      <ToastContainer />
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by shop name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCity}
            onChange={(e) => {
              setSelectedArea("");
              setSelectedCity(e.target.value);
            }}
          >
            <option value="">Filter by City</option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} disabled={!selectedCity}>
            <option value="">Filter by Area</option>
            {areas
              .filter((area) => area.cityId === parseInt(selectedCity))
              .map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
          </select>
        </div>
      </div>

      
      <div className="row">
        {filteredGroomers.length > 0 ? (
          filteredGroomers.map((groomer) => (
            <div className="col-md-4 mb-4" key={groomer.groomerId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{groomer.shopName}</h5>
                  <p className="card-text">
                    <strong>Groomer:</strong> {groomer.user.firstName} {groomer.user.lastName} <br />
                    <strong>Phone:</strong> {groomer.shopPhoneNo} <br />
                    <strong>City:</strong> {groomer.city.cityName} <br />
                    <strong>Area:</strong> {groomer.area.areaName} <br />
                    <strong>Address:</strong> {groomer.shopAddress} <br />
                    <strong>Rating:</strong> {groomer.rating} / 5 <br />
                    <strong>Slots Available:</strong> {groomer.noOfSlots}
                  </p>
                  <span className={`badge ${groomer.status === "APPROVED" ? "bg-success" : "bg-warning"}`}>{groomer.status}</span>
                </div>
                <button
                  className="btn btn-primary m-4 mt-3"
                  onClick={() => handleBookAppointment(groomer.groomerId)}
                  disabled={groomer.status !== "APPROVED"}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No groomers found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}
