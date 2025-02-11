import React, { useEffect, useState } from "react";
import { deleteGroomer, getGroomerListByStatus } from "../../api-request/admin-request";
import { updateGroomerInfoByGroomerId } from "../../api-request/groomer-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import Swal from "sweetalert2";
import { updateUserById } from "../../api-request/user-request";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function GroomerList() {
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();
  const { register: registerGroomer, handleSubmit: handleSubmitGroomer, reset: resetGroomer, setValue: setValueGroomer } = useForm();
  const [groomers, setGroomers] = useState([]);
  const [currentGroomer, setCurrentGroomer] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");

  const fetchGroomers = async () => {
    try {
      const groomerResponse = await getGroomerListByStatus("APPROVED");
      const cityAreaResponse = await getCitiesAndLocations();

      setCities(cityAreaResponse.data.cities);
      setAreas(cityAreaResponse.data.areas);
      setGroomers(groomerResponse.data);
      setFiltered(groomerResponse.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch groomers", "error");
    }
  };

  useEffect(() => {
    fetchGroomers();
  }, []);

  function handleViewGroomer(data) {
    setCurrentGroomer(data);
    setShowViewModal(true);
  }

  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };
  const handleCloseModal = () => {
    resetGroomer();
    setShowUpdateModal(false);
  };
  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  const handleUpdateUser = async (data) => {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateUserById(data.userId, requestBody);
    if (response.status) {
      Swal.fire("Success", "User updated successfully", "success");
      fetchGroomers();
      resetUser();
      setShowUserModal(false);
    } else {
      Swal.fire("Error", "Failed to update user", "error");
    }
  };
  const handleShowUserModal = () => setShowUserModal(true);
  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };
  const handleUpdateGroomer = async (data) => {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateGroomerInfoByGroomerId(data.groomerId, requestBody);
    if (response.status) {
      Swal.fire("Success", "Groomer updated successfully", "success");
      fetchGroomers();
      resetGroomer();
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Failed to update groomer", "error");
    }
  };

  const handleDeleteGroomer = (groomerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGroomer(groomerId);
          Swal.fire("Deleted!", "Groomer has been deleted.", "success");
          fetchGroomers();
        } catch (error) {
          Swal.fire("Error", "Failed to delete groomer", "error");
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
  const handleEditGroomer = (groomer) => {
    setValueGroomer("shopName", groomer.shopName);
    setValueGroomer("shopPhoneNo", groomer.shopPhoneNo);
    setValueGroomer("shopAddress", groomer.shopAddress);
    setValueGroomer("noOfSlots", groomer.noOfSlots);
    setValueGroomer("cityId", groomer.city.cityId);
    setValueGroomer("areaId", groomer.area.areaId);
    setSelectedCityId(groomer.city.cityId);
    setShowUpdateModal(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Groomers</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredGroomers = groomers.filter(
              (data) =>
                data.user.firstName.toLowerCase().includes(query) ||
                data.user.lastName.toLowerCase().includes(query) ||
                data.user.email.toLowerCase().includes(query) ||
                data.user.phoneNo.includes(query)
            );
            setFiltered(filteredGroomers);
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
            <tr key={data.groomerId}>
              <td>{index + 1}</td>
              <td>
                {data.user.firstName} {data.user.lastName}
              </td>
              <td>{data.user.email}</td>
              <td>{data.user.phoneNo}</td>
              <td>{data.user.city.cityName}</td>
              <td>{data.user.area.areaName}</td>
              <td>
                <div>
                  <button className="btn btn-sm btn-info m-1" onClick={() => handleViewGroomer(data)}>
                    View Groomer
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditUser(data.user)}>
                    Edit User
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditGroomer(data)}>
                    Edit Groomer
                  </button>
                  <button className="btn btn-sm btn-danger m-1" onClick={() => handleDeleteGroomer(data.groomerId)}>
                    Delete Groomer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
      
      <Modal show={showUpdateModal} size="lg" onHide={handleCloseModal} backdrop="static" scrollable={true} keyboard={false}>
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

      
      <Modal show={showViewModal} size="lg" onHide={handleCloseViewModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Groomer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="text">Groomer Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.shopName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.rating || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Phone No</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.shopPhoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Shop Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.shopAddress || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>No of Slots Per Day</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.noOfSlots || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.area?.areaName || ""} />
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
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.firstName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.lastName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.email || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.phoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.address || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.area?.areaName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentGroomer?.user?.aadharNo || ""} />
                </Form.Group>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
