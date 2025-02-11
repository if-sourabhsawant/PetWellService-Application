import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroomerInfoByUserId, updateGroomerInfoByGroomerId } from "../../api-request/groomer-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { addGroomer } from "../../redux/store";
import Swal from "sweetalert2";
import { updateUserById } from "../../api-request/user-request";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";

export default function GroomerProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const { register: registerGroomer, handleSubmit: handleSubmitGroomer, reset: resetGroomer, setValue: setValueGroomer } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [groomerData, setGroomerData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("user ", user);

    const response = await getGroomerInfoByUserId(user.userId);
    const cityAreaResponse = await getCitiesAndLocations();

    setCities(cityAreaResponse.data.cities);
    setAreas(cityAreaResponse.data.areas);
    if (response.status) {
      console.log("response", response.data);
      dispatch(addGroomer(response.data.groomerId));
      setGroomerData(response.data);
    } else {
      Swal.fire("Failed", "Failed to fetch veterinaries", "error");
    }
  }

  const handleEditUser = (user) => {
    setValueUser("userId", user.userId);
    setValueUser("firstName", user.firstName);
    setValueUser("lastName", user.lastName);
    setValueUser("phoneNo", user.phoneNo);
    setValueUser("password", user.password);
    setValueUser("email", user.email);
    setValueUser("aadharNo", user.aadharNo);
    setValueUser("address", user.address);
    setValueUser("cityId", user.city.cityId);
    setSelectedCityId(user.city.cityId);
    setValueUser("areaId", user.area.areaId);
    setValueUser("roleId", user.role.roleId);
    handleShowUserModal();
  };

  const handleEditGroomer = (groomer) => {
    setValueGroomer("groomerId", groomer.groomerId);
    setValueGroomer("shopName", groomer.shopName);
    setValueGroomer("shopPhoneNo", groomer.shopPhoneNo);
    setValueGroomer("shopAddress", groomer.shopAddress);
    setValueGroomer("noOfSlots", groomer.noOfSlots);
    setValueGroomer("cityId", groomer.city.cityId);
    setValueGroomer("areaId", groomer.area.areaId);
    setSelectedCityId(groomer.city.cityId);
    setShowUpdateModal(true);
  };

  const handleShowUserModal = () => setShowUserModal(true);

  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };

  const handleCloseUpdateModal = () => {
    registerGroomer();
    setShowUpdateModal(false);
  };

  async function handleUpdateUser(data) {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
      roleId: parseInt(data.roleId, 10),
    };
    const response = await updateUserById(data.userId, requestBody);

    if (response.status) {
      Swal.fire("Success", "User updated successfully", "success");
      fetchData();
      resetUser();
      handleCloseUserModal();
    } else {
      Swal.fire("Error", "Failed to update user", "error");
    }
  }

  async function handleUpdateGroomer(data) {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    console.log(data);

    const response = await updateGroomerInfoByGroomerId(data.groomerId, requestBody);
    if (response.status) {
      Swal.fire("Success", "Groomer updated successfully", "success");
      fetchData();
      resetGroomer();
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Failed to update groomer", "error");
    }
  }

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  return (
    <div className="container">
      {groomerData && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-warning m-1" onClick={() => handleEditUser(groomerData.user)}>
              Update User Profile
            </button>
            <button className="btn btn-warning m-1" onClick={() => handleEditGroomer(groomerData)}>
              Update Groomer Profile
            </button>
          </div>
          <div className="section">
            <h3>User Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Groomer ID</label>
                <input type="text" className="form-control" value={groomerData.groomerId} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={groomerData.user.firstName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={groomerData.user.lastName} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={groomerData.user.email} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone No</label>
                <input type="text" className="form-control" value={groomerData.user.phoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar No</label>
                <input type="text" className="form-control" value={groomerData.user.aadharNo} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={groomerData.user.city.cityName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Area</label>
                <input type="text" className="form-control" value={groomerData.user.area.areaName} readOnly />
              </div>
            </div>
          </div>

          <div className="section mt-5">
            <h3>Shop Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Shop Name</label>
                <input type="text" className="form-control" value={groomerData.shopName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Shop Phone No</label>
                <input type="text" className="form-control" value={groomerData.shopPhoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Shop Address</label>
                <input type="text" className="form-control" value={groomerData.shopAddress} readOnly />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={groomerData.city.cityName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Area</label>
                <input type="text" className="form-control" value={groomerData.area.areaName} readOnly />
              </div>
            </div>
          </div>

          <div className="section mt-5">
            <h3>Groomer Information</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Rating</label>
                <input type="text" className="form-control" value={groomerData.rating} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">No of Slots Per Day</label>
                <input type="text" className="form-control" value={groomerData.noOfSlots} readOnly />
              </div>
            </div>
          </div>

          <div className="section mt-5">
            <h3>Status & Slots</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" value={groomerData.status} readOnly />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Available Slots</label>
                <ul className="list-group">
                  {groomerData.slots.map((slot) => (
                    <li key={slot.slotId} className="list-group-item">
                      {slot.slotTime} - {slot.available ? "Available" : "Unavailable"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal show={showUserModal} size="lg" onHide={handleCloseUserModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUser(handleUpdateUser)}>
            <Form.Control type="hidden" {...registerUser("userId")} />
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" {...registerUser("firstName", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" {...registerUser("lastName", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" {...registerUser("email", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control type="text" {...registerUser("phoneNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" {...registerUser("password", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Aadhar No</Form.Label>
                  <Form.Control type="text" {...registerUser("aadharNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" {...registerUser("address", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Select {...registerUser("cityId", { required: true })} onChange={handleCityChange}>
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
                  <Form.Select {...registerUser("areaId", { required: true })}>
                    <option value="">Select Area</option>
                    {areas
                      .filter((area) => area.cityId === parseInt(selectedCityId, 10))
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
        </Modal.Body>
      </Modal>
      
      <Modal show={showUpdateModal} size="lg" onHide={handleCloseUpdateModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Groomer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitGroomer(handleUpdateGroomer)}>
            <Form.Control type="hidden" {...registerGroomer("groomerId")} />
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" {...registerGroomer("shopName", { required: true })} />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Phone No</Form.Label>
                  <Form.Control type="text" {...registerGroomer("shopPhoneNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Address</Form.Label>
                  <Form.Control type="text" {...registerGroomer("shopAddress", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>No of Slots Per Day</Form.Label>
                  <Form.Control type="number" {...registerGroomer("noOfSlots", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Select {...registerGroomer("cityId", { required: true })} onChange={handleCityChange}>
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
                  <Form.Select {...registerGroomer("areaId", { required: true })}>
                    <option value="">Select Area</option>
                    {areas
                      .filter((area) => area.cityId === parseInt(selectedCityId, 10))
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
        </Modal.Body>
      </Modal>
    </div>
  );
}
