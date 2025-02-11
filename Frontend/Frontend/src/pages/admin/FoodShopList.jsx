import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createFoodShop, deleteFoodShop, updateFoodShop } from "../../api-request/admin-request";
import { getAllFoodShops } from "../../api-request/food-shop-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";

export default function FoodShopList() {
  const { register: registerFoodShop, handleSubmit: handleSubmitFoodShop, reset: resetFoodShop, setValue: setValueFoodShop } = useForm();
  const [foodShops, setFoodShops] = useState([]);
  const [currentFoodShop, setCurrentFoodShop] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");

  
  const fetchFoodShops = async () => {
    try {
      const foodShopResponse = await getAllFoodShops();
      const cityAreaResponse = await getCitiesAndLocations();

      setCities(cityAreaResponse.data.cities);
      setAreas(cityAreaResponse.data.areas);
      setFoodShops(foodShopResponse.data);
      setFiltered(foodShopResponse.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch food shops", "error");
    }
  };

  useEffect(() => {
    fetchFoodShops();
  }, []);

  
  const handleViewFoodShop = (data) => {
    setCurrentFoodShop(data);
    setShowViewModal(true);
  };

  
  const handleCreateFoodShop = async (data) => {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
      status: "APPROVED",
    };
    console.log(requestBody);

    const response = await createFoodShop(requestBody);
    if (response.status) {
      Swal.fire("Success", "Food shop created successfully", "success");
      fetchFoodShops();
      resetFoodShop();
      setShowCreateModal(false);
    } else {
      Swal.fire("Error", "Failed to create food shop "+ response.message, "error");
    }
  };

  
  const handleUpdateFoodShop = async (data) => {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateFoodShop(data.shopId, requestBody);
    if (response.status) {
      Swal.fire("Success", "Food shop updated successfully", "success");
      fetchFoodShops();
      resetFoodShop();
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Failed to update food shop", "error");
    }
  };

  
  const handleDeleteFoodShop = (shopId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteFoodShop(shopId);
          if (response.status) {
            Swal.fire("Deleted!", "Food shop has been deleted.", "success");
            fetchFoodShops();
          } else {
            Swal.fire("Error", "Failed to delete food shop <br/>" + response.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete food shop", "error");
        }
      }
    });
  };

  
  const handleEditFoodShop = (foodShop) => {
    setValueFoodShop("shopId", foodShop.shopId);
    setValueFoodShop("shopName", foodShop.shopName);
    setValueFoodShop("shopRegistrationId", foodShop.shopRegistrationId);
    setValueFoodShop("rating", foodShop.rating);
    setValueFoodShop("cityId", foodShop.city.cityId);
    setValueFoodShop("areaId", foodShop.area.areaId);
    setValueFoodShop("shopPhoneNo", foodShop.shopPhoneNo);
    setValueFoodShop("shopAddress", foodShop.shopAddress);
    setValueFoodShop("status", foodShop.status);
    setSelectedCityId(foodShop.city.cityId);
    setShowUpdateModal(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Food Shops</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Shop Name, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredFoodShops = foodShops.filter((data) => data.shopName.toLowerCase().includes(query) || data.shopPhoneNo.includes(query));
            setFiltered(filteredFoodShops);
          }}
        />
        
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Shop Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Area</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((data, index) => (
            <tr key={data.shopId}>
              <td>{index + 1}</td>
              <td>{data.shopName}</td>
              <td>{data.shopPhoneNo}</td>
              <td>{data.city.cityName}</td>
              <td>{data.area.areaName}</td>
              
              <td>
                <div>
                  <Button className="btn btn-sm btn-info m-1" onClick={() => handleViewFoodShop(data)}>
                    View
                  </Button>
                 
                  <Button className="btn btn-sm btn-danger m-1" onClick={() => handleDeleteFoodShop(data.shopId)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal
        show={showViewModal}
        onHide={() => {
          resetFoodShop();
          setShowViewModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Food Shop Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <h5>Food Shop Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.shopName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Registration ID</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.shopRegistrationId || ""} />
                </Form.Group>
              </div>
             
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Phone No</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.shopPhoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.shopAddress || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentFoodShop?.area?.areaName || ""} />
                </Form.Group>
              </div>
           
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
