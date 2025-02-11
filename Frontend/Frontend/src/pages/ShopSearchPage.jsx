import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getAllFoodShops } from "../api-request/food-shop-request";
import { getCitiesAndLocations } from "../api-request/location-request";

export default function ShopSearchPage() {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getAllFoodShops();
    const response1 = await getCitiesAndLocations();
    console.log(response1);
    console.log(response);

    if (response.status) {
      console.log(response);

      setShops(response.data);
      setFilteredShops(response.data);
    } else {
      toast.error("Failed to fetch veterinaries");
    }

    if (response1.status) {
      setCities(response1.data.cities);
      setAreas(response1.data.areas);
    }
  }

  
  useEffect(() => {
    let result = shops;

    
    if (searchQuery) {
      result = result.filter((shop) => shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    
    if (selectedCity) {
      result = result.filter((shop) => shop.city.cityId === parseInt(selectedCity));
    }

    
    if (selectedArea) {
      result = result.filter((shop) => shop.area.areaId === parseInt(selectedArea));
    }

    setFilteredShops(result);
  }, [searchQuery, selectedCity, selectedArea, shops]);

  return (
    <div className="container mt-4">
      <ToastContainer />

      <h3 className="mb-4">Search and Filter Shops</h3>

      
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
          <select
            className="form-select"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            disabled={!selectedCity} 
          >
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
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <div className="col-md-4 mb-4 " key={shop.shopId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">
                    <strong>Registration ID:</strong> {shop.shopRegistrationId} <br />
                    <strong>Rating:</strong> {shop.rating} / 5 <br />
                    <strong>City:</strong> {shop.city.cityName} <br />
                    <strong>Area:</strong> {shop.area.areaName} <br />
                    <strong>Phone:</strong> {shop.shopPhoneNo} <br />
                    <strong>Address:</strong> {shop.shopAddress}
                  </p>
                  <span className={`badge bg-success`}>Visit now</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No shops found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}
