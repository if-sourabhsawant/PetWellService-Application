import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { deleteUser, getAllUsers } from "../../api-request/admin-request";
import { getCitiesAndLocations } from "../../api-request/location-request";
import { updateUserById } from "../../api-request/user-request";
import Swal from "sweetalert2";


export default function ManageUserList() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const userResponse = await getAllUsers();
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

  
  const handleUpdateUser = async (data) => {
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
      reset();
      handleClose();
    } else {
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  
  const handleDeleteUser = (userId) => {
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
          await deleteUser(userId);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers(); 
        } catch (error) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setValue("userId", user.userId);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("phoneNo", user.phoneNo);
    setValue("password", user.password);
    setValue("email", user.email);
    setValue("aadharNo", user.aadharNo);
    setValue("address", user.address);
    setValue("cityId", user.city.cityId);
    setSelectedCityId(user.city.cityId);
    setValue("areaId", user.area.areaId);
    setValue("roleId", user.role.roleId);

    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Users</h3>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredUsers = users.filter(
              (user) =>
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phoneNo.includes(query)
            );
            setFiltered(filteredUsers);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>City</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.userId}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.phoneNo}</td>
              <td>{user.role.roleName}</td>
              <td>{user.city.cityName}</td>
              <td>{user.area.areaName}</td>
              <td>
                {/* <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#userModal" onClick={() => handleEditUser(user)}>
                  Edit
                </button> */}
                <button className="btn btn-sm btn-danger mx-2" onClick={() => handleDeleteUser(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {/* <Modal show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? "Update User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(currentUser ? handleUpdateUser : () => {})}>
            <Form.Control type="hidden" {...register("userId")} />

            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" {...register("firstName", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" {...register("lastName", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="text" {...register("phoneNo", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Aadhar No</Form.Label>
              <Form.Control type="text" {...register("aadharNo", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" {...register("address", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Select {...register("cityId", { required: true })} onChange={handleCityChange}>
                <option value="">Select City</option>
                {cities.map((area) => (
                  <option key={area.cityId} value={area.cityId}>
                    {area.cityName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Area</Form.Label>
              <Form.Select {...register("areaId", { required: true })}>
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

            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
}
