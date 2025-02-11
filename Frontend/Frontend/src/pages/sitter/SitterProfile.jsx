import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSitter } from "../../redux/store";
import { getSitterInfoByUserId, updateSitterInfoBySitterId } from "../../api-request/sitter-request";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { updateUserById } from "../../api-request/user-request";
import { Button, Form, Modal } from "react-bootstrap";
import { getCitiesAndLocations } from "../../api-request/location-request";

export default function SitterProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const { register: registerSitter, handleSubmit: handleSubmitSitter, reset: resetSitter, setValue: setValueSitter } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSitterModal, setShowSitterModal] = useState(false);

  const [sitterData, setSitterData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("user ", user);

    const response = await getSitterInfoByUserId(user.userId);
    const cityAreaResponse = await getCitiesAndLocations();

    setCities(cityAreaResponse.data.cities);
    setAreas(cityAreaResponse.data.areas);
    if (response.status) {
      console.log("response", response.data);
      dispatch(addSitter(response.data.sitterId));
      setSitterData(response.data);
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

  const handleEditSitter = (sitter) => {
    setValueSitter("sitterId", sitter.sitterId);
    setValueSitter("centerPhoneNo", sitter.centerPhoneNo);
    setValueSitter("centerAddress", sitter.centerAddress);
    setValueSitter("noOfSlots", sitter.noOfSlots);
    setValueSitter("cityId", sitter.city.cityId);
    setValueSitter("areaId", sitter.area.areaId);
    setSelectedCityId(sitter.city.cityId);

    handleShowSitterModal();
  };

  const handleShowUserModal = () => setShowUserModal(true);
  const handleShowSitterModal = () => setShowSitterModal(true);

  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };

  const handleCloseSitterModal = () => {
    resetSitter();
    setShowSitterModal(false);
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

  async function handleUpdateSitter(data) {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateSitterInfoBySitterId(data.sitterId, requestBody);

    if (response.status) {
      Swal.fire("Success", "Sitter updated successfully", "success");
      fetchData();
      resetSitter();
      handleCloseSitterModal();
    } else {
      Swal.fire("Error", "Failed to update sitter", "error");
    }
  }

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  return (
    <div className="container">
      {sitterData && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-warning m-1" onClick={() => handleEditUser(sitterData.user)}>
              Update User Profile
            </button>
            <button className="btn btn-warning m-1" onClick={() => handleEditSitter(sitterData)}>
              Update Sitter Profile
            </button>
          </div>
          <div className="section">
            <h3>User Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Sitter ID</label>
                <input type="text" className="form-control" value={sitterData.sitterId} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={sitterData.user.firstName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={sitterData.user.lastName} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={sitterData.user.email} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone No</label>
                <input type="text" className="form-control" value={sitterData.user.phoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar No</label>
                <input type="text" className="form-control" value={sitterData.user.aadharNo} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={sitterData.user.city.cityName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Area</label>
                <input type="text" className="form-control" value={sitterData.user.area.areaName} readOnly />
              </div>
            </div>
          </div>

          <div className="section mt-5">
            <h3>Center Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Center Phone No</label>
                <input type="text" className="form-control" value={sitterData.centerPhoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Center Address</label>
                <input type="text" className="form-control" value={sitterData.centerAddress} readOnly />
              </div>
            </div>
          </div>

          <div className="section mt-5">
            <h3>Sitter Information</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Rating</label>
                <input type="text" className="form-control" value={sitterData.rating} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" value={sitterData.status} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">No of Slots Per Day</label>
                <input type="text" className="form-control" value={sitterData.noOfSlots} readOnly />
              </div>
            </div>
          </div>
        </>
      )}

      <Modal size="lg" show={showSitterModal} onHide={handleCloseSitterModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Sitter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitSitter(handleUpdateSitter)}>
            <Form.Control type="hidden" {...registerSitter("sitterId")} />
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Center Phone No</Form.Label>
                  <Form.Control type="text" {...registerSitter("centerPhoneNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Center Address</Form.Label>
                  <Form.Control type="text" {...registerSitter("centerAddress", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>No of Slots Per Day</Form.Label>
                  <Form.Control type="number" {...registerSitter("noOfSlots", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Select {...registerSitter("cityId", { required: true })} onChange={handleCityChange}>
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
                  <Form.Select {...registerSitter("areaId", { required: true })}>
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
    </div>
  );
}
