import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { getUserInfoById, updateUserById } from "../../api-request/user-request";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const cityAreaResponse = await getCitiesAndLocations();
    const response = await getUserInfoById(user.userId);

    if (response.status) {
      console.log("response", response.data);
      setUserData(response.data);
    } else {
      Swal.fire("Failed", "Failed to fetch veterinaries", "error");
    }
    if (cityAreaResponse.status) {
      setCities(cityAreaResponse.data.cities);
      setAreas(cityAreaResponse.data.areas);
    } else {
      Swal.fire("Failed", "Failed to fetch veterinaries", "error");
    }
  }
  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };
  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  const handleShowUserModal = () => setShowUserModal(true);
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

  return (
    <div className="container">
      {userData && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-warning m-1" onClick={() => handleEditUser(userData)}>
              Update User Profile
            </button>
          </div>
          <div className="section">
            <h3>User Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">User ID</label>
                <input type="text" className="form-control" value={userData.userId} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={userData.firstName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={userData.lastName} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={userData.email} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone No</label>
                <input type="text" className="form-control" value={userData.phoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar No</label>
                <input type="text" className="form-control" value={userData.aadharNo} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={userData.city.cityName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Area</label>
                <input type="text" className="form-control" value={userData.area.areaName} readOnly />
              </div>
            </div>
          </div>

          {/* <div className="section mt-5">
            <h3>Role Information</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Role</label>
                <input type="text" className="form-control" value={userData.role.roleName} readOnly />
              </div>
            </div>
          </div> */}
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
    </div>
  );
}
