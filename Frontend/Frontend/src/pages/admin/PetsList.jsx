import React, { useEffect, useState } from "react";
import { flattenObject } from "../../utils/helper-functions";
import { useForm } from "react-hook-form";
import { getAllPets } from "../../api-request/admin-request";
import { Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function PetsList() {
  const { register, reset, setValue } = useForm();
  const [pets, setPets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchPets = async () => {
    try {
      
      const petResponse = await getAllPets();
      const flatPetData = petResponse.data.map((data) => flattenObject(data));

      setPets(flatPetData);
      setFiltered(flatPetData);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch pet information", "error");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleViewPet = (pet) => {
    setValue("petName", pet["petName"]);
    setValue("petAge", pet["petAge"]);
    setValue("category", pet["category.categoryName"]);
    setValue("user.firstName", pet["user.firstName"]);
    setValue("user.lastName", pet["user.lastName"]);
    setValue("user.phoneNo", pet["user.phoneNo"]);
    setValue("user.email", pet["user.email"]);
    setValue("user.aadharNo", pet["user.aadharNo"]);
    setValue("user.address", pet["user.address"]);
    setValue("user.cityName", pet["user.city.cityName"]);
    setValue("user.areaName", pet["user.area.areaName"]);
    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Pets</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredPets = pets.filter(
              (pet) =>
                pet["petName"].toLowerCase().includes(query) ||
                pet["user.firstName"].toLowerCase().includes(query) ||
                pet["user.lastName"].toLowerCase().includes(query) ||
                pet["user.email"].toLowerCase().includes(query) ||
                pet["user.phoneNo"].includes(query)
            );
            setFiltered(filteredPets);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Age</th>
            <th>Category</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((pet) => (
            <tr key={pet["petId"]}>
              <td>{pet["petName"]}</td>
              <td>{pet["petAge"]}</td>
              <td>{pet["category.categoryName"]}</td>
              <td>
                {pet["user.firstName"]} {pet["user.lastName"]}
              </td>
              <td>{pet["user.email"]}</td>
              <td>{pet["user.phoneNo"]}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewPet(pet)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Pet Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <h5 className="text">Pet Details</h5>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control type="text" readOnly {...register("petName")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Pet Age</Form.Label>
                  <Form.Control type="text" readOnly {...register("petAge")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" readOnly {...register("category")} />
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
                  <Form.Control type="text" readOnly {...register("user.firstName")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.lastName")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.email")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.phoneNo")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.address")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.cityName")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Area</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.areaName")} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control type="text" readOnly {...register("user.aadharNo")} />
                </Form.Group>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
