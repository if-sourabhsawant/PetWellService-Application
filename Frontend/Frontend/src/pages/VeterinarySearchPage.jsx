import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllVeterinaries } from "../api-request/veterinary-request";
import { getCitiesAndLocations } from "../api-request/location-request";

export default function VeterinarySearchPage() {
  const [veterinaries, setVeterinaries] = useState([]);
  const [filteredVeterinaries, setFilteredVeterinaries] = useState([]);
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
    const response = await getAllVeterinaries();
    const response1 = await getCitiesAndLocations();
    console.log(response1);
    console.log(response);

    if (response.status) {
      console.log(response);

      setVeterinaries(response.data);
      setFilteredVeterinaries(response.data);
    } else {
      toast.error("Failed to fetch veterinaries");
    }

    if (response1.status) {
      setCities(response1.data.cities);
      setAreas(response1.data.areas);
    }
  }

  
  useEffect(() => {
    let result = veterinaries;

    if (searchQuery) {
      result = result.filter((veterinary) => veterinary.clinicName.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCity) {
      result = result.filter((veterinary) => veterinary.city.cityId === parseInt(selectedCity));
    }

    if (selectedArea) {
      result = result.filter((veterinary) => veterinary.area.areaId === parseInt(selectedArea));
    }

    setFilteredVeterinaries(result);
  }, [searchQuery, selectedCity, selectedArea, veterinaries]);

  function handleBookAppointment(id) {
    console.log(`Booking appointment for Veterinary ID: ${id}`);
    toast.success(`Booking appointment for Veterinary ID: ${id}`);
    navigate(`/user/appointments/veterinary/${id}`);
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="mb-4">Search and Filter Veterinaries</h3>

      
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by clinic name"
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
        {filteredVeterinaries.length > 0 ? (
          filteredVeterinaries.map((veterinary) => (
            <div className="col-md-4 mb-4" key={veterinary.veterinaryId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{veterinary.clinicName}</h5>
                  <p className="card-text">
                    <strong>Veterinary:</strong> {veterinary.user.firstName} {veterinary.user.lastName} <br />
                    <strong>Phone:</strong> {veterinary.clinicPhoneNo} <br />
                    <strong>Specialization:</strong> {veterinary.specialization} <br />
                    <strong>Experience:</strong> {veterinary.experience} years
                    <br />
                    <strong>City:</strong> {veterinary.city.cityName} <br />
                    <strong>Area:</strong> {veterinary.area.areaName} <br />
                    <strong>Address:</strong> {veterinary.clinicAddress} <br />
                    <strong>Slots Available:</strong> {veterinary.noOfSlots}
                  </p>
                  <span className={`badge ${veterinary.status === "APPROVED" ? "bg-success" : "bg-warning"}`}>{veterinary.status}</span>
                </div>
                <button
                  className="btn btn-primary m-4 mt-3"
                  onClick={() => handleBookAppointment(veterinary.veterinaryId)}
                  disabled={veterinary.status !== "APPROVED"}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No veterinaries found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}
