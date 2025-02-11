import React, { useEffect, useState } from "react";
import { deleteVeterinary, getVeterinaryListByStatus } from "../../api-request/admin-request";
import { updateVeterinaryInfoByVeterinaryId } from "../../api-request/veterinary-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateUserById } from "../../api-request/user-request";
import { Button, Form, Modal } from "react-bootstrap";

export default function VeterinaryList() {
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, setValue: setValueUser } = useForm();

  const { register: registerVeterinary, handleSubmit: handleSubmitVeterinary, reset: resetVeterinary, setValue: setValueVeterinary } = useForm();
  const [users, setUsers] = useState([]);
  const [currentVeterinary, setCurrentVeterinary] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVeterinaryModal, setShowVeterinaryModal] = useState(false);
  const [showVeterinaryViewModal, setShowVeterinaryViewModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const handleCloseUserModal = () => {
    resetUser();
    setShowUserModal(false);
  };
  const handleCloseVeterinaryModal = () => {
    resetVeterinary();
    setShowVeterinaryModal(false);
  };
  const handleCloseViewModal = () => {
    setShowVeterinaryViewModal(false);
  };
  const handleShowUserModal = () => setShowUserModal(true);
  const handleShowVeterinaryModal = () => setShowVeterinaryModal(true);
  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const userResponse = await getVeterinaryListByStatus("APPROVED");
      const cityAreaResponse = await getCitiesAndLocations();

      console.log(userResponse.data);

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

  
  const handleUpdateUser = async (data) => {
    console.log(data);

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
  };

  
  const handleUpdateVeterinary = async (data) => {
    const requestBody = {
      ...data,
      cityId: parseInt(data.cityId, 10),
      areaId: parseInt(data.areaId, 10),
    };
    const response = await updateVeterinaryInfoByVeterinaryId(data.veterinaryId, requestBody);

    if (response.status) {
      Swal.fire("Success", "Veterinary updated successfully", "success");
      fetchUsers();
      resetVeterinary();
      handleCloseVeterinaryModal();
    } else {
      Swal.fire("Error", "Failed to update veterinary", "error");
    }
  };

  function handleViewVeterinary(data) {
    setCurrentVeterinary(data);
    setShowVeterinaryViewModal(true);
  }

  
  const handleDeleteVeterinary = (veterinaryId) => {
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
          console.log(veterinaryId);

          await deleteVeterinary(veterinaryId);
          Swal.fire("Deleted!", "Veterinary has been deleted.", "success");
          fetchUsers(); 
        } catch (error) {
          Swal.fire("Error", "Failed to delete veterinary", "error");
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

  
  const handleEditVeterinary = (veterinary) => {
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
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Veterinaries</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredUsers = users.filter(
              (data) =>
                data.user.firstName.toLowerCase().includes(query) ||
                data.user.lastName.toLowerCase().includes(query) ||
                data.user.email.toLowerCase().includes(query) ||
                data.user.phoneNo.includes(query)
            );
            setFiltered(filteredUsers);
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
                  <button className="btn btn-sm btn-info m-1" onClick={() => handleViewVeterinary(data)}>
                    View User
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditUser(data.user)}>
                    Edit User
                  </button>
                  <button className="btn btn-sm btn-warning m-1" onClick={() => handleEditVeterinary(data)}>
                    Edit Veterinary
                  </button>
                  <button className="btn btn-sm btn-danger m-1" onClick={() => handleDeleteVeterinary(data.veterinaryId)}>
                    Delete Veterinary
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

      <Modal show={showVeterinaryViewModal} size="lg" onHide={handleCloseViewModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Veterinary Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
       
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="text">Veterinary Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.specialization || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.experience || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>License Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.licenseNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.clinicName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Phone Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.clinicPhoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Clinic Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.clinicAddress || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.area?.areaName || ""} />
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
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.firstName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.lastName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.email || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.phoneNo || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.address || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.city?.cityName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.area?.areaName || ""} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control type="text" readOnly value={currentVeterinary?.user?.aadharNo || ""} />
                </Form.Group>
              </div>
            </div>

            
            {currentVeterinary?.slots?.length > 0 ? (
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
                      {currentVeterinary.slots.map((slot) => (
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
