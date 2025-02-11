import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVeterinary } from "../../redux/store";
import { getVeterinaryInfoByUserId, updateVeterinaryInfoByVeterinaryId } from "../../api-request/veterinary-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateUserById } from "../../api-request/user-request";
import { Button, Form, Modal } from "react-bootstrap";

export default function VeterinaryProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const { register: registerVeterinary, handleSubmit: handleSubmitVeterinary, reset: resetVeterinary, setValue: setValueVeterinary } = useForm();

  const dispatch = useDispatch();
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [showVeterinaryModal, setShowVeterinaryModal] = useState(false);

  const [veterinaryData, setVeterinaryData] = useState();
  const handleCloseVeterinaryModal = () => {
    resetVeterinary();
    setShowVeterinaryModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("user ", user);

    const response = await getVeterinaryInfoByUserId(user.userId);
    const cityAreaResponse = await getCitiesAndLocations();

    setCities(cityAreaResponse.data.cities);
    setAreas(cityAreaResponse.data.areas);
    if (response.status) {
      console.log("response", response.data);
      dispatch(addVeterinary(response.data.veterinaryId));
      setVeterinaryData(response.data);
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

  const handleShowUserModal = () => setShowUserModal(true);

  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
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

  async function handleUpdateVeterinary(data) {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateVeterinaryInfoByVeterinaryId(data.veterinaryId, requestBody);

    if (response.status) {
      Swal.fire("Success", "Veterinary updated successfully", "success");
      fetchData();
      resetVeterinary();
      handleCloseVeterinaryModal();
    } else {
      Swal.fire("Error", "Failed to update veterinary", "error");
    }
  }

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };
  const handleShowVeterinaryModal = () => setShowVeterinaryModal(true);

  function handleEditVeterinary(veterinary) {
    setValueVeterinary("veterinaryId", veterinary.veterinaryId);
    setValueVeterinary("specialization", veterinary.specialization);
    setValueVeterinary("experience", veterinary.experience);
    setValueVeterinary("licenseNo", veterinary.licenseNo);
    setValueVeterinary("clinicName", veterinary.clinicName);
    setValueVeterinary("clinicPhoneNo", veterinary.clinicPhoneNo);
    setValueVeterinary("clinicAddress", veterinary.clinicAddress);
    setValueVeterinary("noOfSlots", veterinary.noOfSlots);
    setValueVeterinary("cityId", veterinary.city.cityId);
    setValueVeterinary("areaId", veterinary.area.areaId);
    setSelectedCityId(veterinary.city.cityId);

    handleShowVeterinaryModal();
  }

  return (
    <div className="container">
      {veterinaryData && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-warning m-1" onClick={() => handleEditUser(veterinaryData.user)}>
              Update User Profile
            </button>
            <button className="btn btn-warning m-1" onClick={() => handleEditVeterinary(veterinaryData)}>
              Update Veterinary Profile
            </button>
          </div>
          <div className="section">
            <h3>User Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Veterinary ID</label>
                <input type="text" className="form-control" value={veterinaryData.veterinaryId} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={veterinaryData.user.firstName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={veterinaryData.user.lastName} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={veterinaryData.user.email} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone No</label>
                <input type="text" className="form-control" value={veterinaryData.user.phoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar No</label>
                <input type="text" className="form-control" value={veterinaryData.user.aadharNo} readOnly />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={veterinaryData.user.city.cityName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Area</label>
                <input type="text" className="form-control" value={veterinaryData.user.area.areaName} readOnly />
              </div>
            </div>
          </div>
          <div className="section mt-5">
            <h3>Clinic Details</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Clinic Name</label>
                <input type="text" className="form-control" value={veterinaryData.clinicName} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Clinic Phone No</label>
                <input type="text" className="form-control" value={veterinaryData.clinicPhoneNo} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Clinic Address</label>
                <input type="text" className="form-control" value={veterinaryData.clinicAddress} readOnly />
              </div>
            </div>
          </div>
          <div className="section mt-5">
            <h3>Veterinary Information</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Specialization</label>
                <input type="text" className="form-control" value={veterinaryData.specialization} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Experience (Years)</label>
                <input type="text" className="form-control" value={veterinaryData.experience} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">License No</label>
                <input type="text" className="form-control" value={veterinaryData.licenseNo} readOnly />
              </div>
            </div>
          </div>
          <div className="section mt-5">
            <h3>Status & Slots</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" value={veterinaryData.status} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">No of Slots Per Day</label>
                <input type="text" className="form-control" value={veterinaryData.noOfSlots} readOnly />
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

      <Modal size="lg" show={showVeterinaryModal} onHide={handleCloseVeterinaryModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Veterinary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitVeterinary(handleUpdateVeterinary)}>
            <Form.Control type="hidden" {...registerVeterinary("veterinaryId")} />
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control type="text" {...registerVeterinary("specialization", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control type="number" {...registerVeterinary("experience", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>License No</Form.Label>
                  <Form.Control type="text" {...registerVeterinary("licenseNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Name</Form.Label>
                  <Form.Control type="text" {...registerVeterinary("clinicName", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Phone No</Form.Label>
                  <Form.Control type="text" {...registerVeterinary("clinicPhoneNo", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Address</Form.Label>
                  <Form.Control type="text" {...registerVeterinary("clinicAddress", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>No of Slots Per Day</Form.Label>
                  <Form.Control type="number" {...registerVeterinary("noOfSlots", { required: true })} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Select {...registerVeterinary("cityId", { required: true })} onChange={handleCityChange}>
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
                  <Form.Select {...registerVeterinary("areaId", { required: true })}>
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
