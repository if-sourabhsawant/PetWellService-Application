import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllSitters } from "../api-request/sitter-request";
import { getCitiesAndLocations } from "../api-request/location-request";

export default function SitterSearchPage() {
  const [sitters, setSitters] = useState([]);
  const [filteredSitters, setFilteredSitters] = useState([]);
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
    const response = await getAllSitters();
    const response1 = await getCitiesAndLocations();
    console.log(response1);
    console.log(response);

    if (response.status) {
      console.log(response);

      setSitters(response.data);
      setFilteredSitters(response.data);
    } else {
      toast.error("Failed to fetch veterinaries");
    }

    if (response1.status) {
      setCities(response1.data.cities);
      setAreas(response1.data.areas);
    }
  }
  
  useEffect(() => {
    let result = sitters;

    if (searchQuery) {
      result = result.filter((sitter) => sitter.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCity) {
      result = result.filter((sitter) => sitter.city.cityId === parseInt(selectedCity));
    }

    if (selectedArea) {
      result = result.filter((sitter) => sitter.area.areaId === parseInt(selectedArea));
    }

    setFilteredSitters(result);
  }, [searchQuery, selectedCity, selectedArea, sitters]);

  function handleBookAppointment(id) {
    console.log(`Booking appointment for sitter ID: ${id}`);
    toast.success(`Booking appointment for sitter ID: ${id}`);
    navigate(`/user/appointments/sitter/${id}`);
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="mb-4">Search and Filter Sitters</h3>

      
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by sitter name"
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
        {filteredSitters.length > 0 ? (
          filteredSitters.map((sitter) => (
            <div className="col-md-4 mb-4" key={sitter.sitterId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {sitter.user.firstName} {sitter.user.lastName}
                  </h5>
                  <p className="card-text">
                    <strong>Phone:</strong> {sitter.centerPhoneNo} <br />
                    <strong>City:</strong> {sitter.city.cityName} <br />
                    <strong>Area:</strong> {sitter.area.areaName} <br />
                    <strong>Address:</strong> {sitter.centerAddress} <br />
                    <strong>Rating:</strong> {sitter.rating} / 5 <br />
                    <strong>Slots Available:</strong> {sitter.noOfSlots}
                  </p>
                  <span className={`badge ${sitter.status === "APPROVED" ? "bg-success" : "bg-warning"}`}>{sitter.status}</span>
                </div>
                <button
                  className="btn btn-primary m-4 mt-3"
                  onClick={() => handleBookAppointment(sitter.sitterId)}
                  disabled={sitter.status !== "APPROVED"}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sitters found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}
