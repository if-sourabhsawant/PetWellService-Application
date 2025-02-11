import React, { useEffect, useState } from "react";
import { deleteSitter, getSitterListByStatus } from "../../api-request/admin-request";
import { updateSitterInfoBySitterId } from "../../api-request/sitter-request";
import { updateUserById } from "../../api-request/user-request";
import Swal from "sweetalert2";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";

export default function SitterList() {
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const { register: registerSitter, handleSubmit: handleSubmitSitter, reset: resetSitter, setValue: setValueSitter } = useForm();

  const [users, setUsers] = useState([]);
  const [currentSitter, setCurrentSitter] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSitterModal, setShowSitterModal] = useState(false);
  const [showSitterViewModal, setShowSitterViewModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");

  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };

  const handleCloseSitterModal = () => {
    resetSitter();
    setShowSitterModal(false);
  };

  const handleCloseViewModal = () => {
    setShowSitterViewModal(false);
  };

  const handleShowUserModal = () => setShowUserModal(true);
  const handleShowSitterModal = () => setShowSitterModal(true);

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const userResponse = await getSitterListByStatus("APPROVED");
      const cityAreaResponse = await getCitiesAndLocations();

      setCities(cityAreaResponse.data.cities);
      setAreas(cityAreaResponse.data.areas);
      setUsers(userResponse.data);
      setFiltered(userResponse.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  
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
      fetchUsers();
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
      fetchUsers();
      resetSitter();
      handleCloseSitterModal();
    } else {
      Swal.fire("Error", "Failed to update sitter", "error");
    }
  }

  function handleViewSitter(data) {
    setCurrentSitter(data);
    setShowSitterViewModal(true);
  }

  
  const handleDeleteSitter = (sitterId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSitter(sitterId);
          Swal.fire("Deleted!", "Sitter has been deleted.", "success");
          fetchUsers(); 
        } catch (error) {
          Swal.fire("Error", "Failed to delete sitter", "error");
        }
      }
    });
  };

  
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

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Sitters</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredSitters = users.filter(
              (data) =>
                data.user.firstName.toLowerCase().includes(query) ||
                data.user.lastName.toLowerCase().includes(query) ||
                data.user.email.toLowerCase().includes(query) ||
                data.user.phoneNo.includes(query)
            );
            setFiltered(filteredSitters);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((data, index) => (
            <tr key={data.user.userId}>
              <td>{index + 1}</td>
              <td>
                {data.user.firstName} {data.user.lastName}
              </td>
              <td>{data.user.email}</td>
              <td>{data.user.phoneNo}</td>
              <td>{data.user.city.cityName}</td>
              <td>{data.user.area.areaName}</td>
              <td className="">
                <div>
                  <button className="btn btn-sm btn-info m-1" onClick={() => handleViewSitter(data)}>
                    View Sitter
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditUser(data.user)}>
                    Edit User
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditSitter(data)}>
                    Edit Sitter
                  </button>
                  <button className="btn btn-sm btn-danger m-1" onClick={() => handleDeleteSitter(data.sitterId)}>
                    Delete Sitter
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      <Modal show={showSitterViewModal} size="lg" onHide={handleCloseViewModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Sitter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="text">Sitter Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Center Phone No</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.centerPhoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Center Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.centerAddress || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>No of Slots Per Day</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.noOfSlots || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.status || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.area?.areaName || ""} />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <h5 className="text">User Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.firstName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.lastName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.email || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.phoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.address || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.area?.areaName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentSitter?.user?.aadharNo || ""} />
                </Form.Group>
              </div>
            </div>

            {currentSitter?.slots?.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <h5 className="text">Slots</h5>
                </div>
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Slot ID</th>
                        <th>Slot Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSitter.slots.map((slot) => (
                        <tr key={slot.slotId}>
                          <td>{slot.slotId}</td>
                          <td>{slot.slotTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p colSpan="2" className="text-center">
                No Slots Available
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
