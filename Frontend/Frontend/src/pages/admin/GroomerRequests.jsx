import React, { useEffect, useState } from "react";

import { getGroomerListByStatus, updateGroomerStatus } from "../../api-request/admin-request";
import { useForm } from "react-hook-form";
import { flattenGroomerData } from "../../utils/helper-functions";
import Swal from "sweetalert2";
import { Form, Modal } from "react-bootstrap";

export default function GroomerRequests() {
  const { register, reset, setValue } = useForm();
  const [groomers, setGroomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchGroomers = async () => {
    try {
      const groomerResponse = await getGroomerListByStatus("PENDING");
      const flatUserData = groomerResponse.data.map((data) => flattenGroomerData(data));

      setGroomers(flatUserData);
      setFiltered(flatUserData);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch groomer requests", "error");
    }
  };

  useEffect(() => {
    fetchGroomers();
  }, []);

  const handleApproveGroomer = async (groomerId) => {
    try {
      const response = await updateGroomerStatus(groomerId, "APPROVED");
      if (response.status) {
        Swal.fire("Success", "Groomer request approved successfully", "success");
        fetchGroomers();
      } else {
        Swal.fire("Error", "Failed to approve request", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to approve groomer request", "error");
    }
  };

  const handleDeleteGroomer = (groomerId) => {
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
          await updateGroomerStatus(groomerId, "DENIAL");
          Swal.fire("Deleted!", "Groomer request has been deleted.", "success");
          fetchGroomers();
        } catch (error) {
          Swal.fire("Error", "Failed to delete groomer request", "error");
        }
      }
    });
  };

  const handleViewGroomer = (groomer) => {
    setValue("firstName", groomer.firstName);
    setValue("lastName", groomer.lastName);
    setValue("phoneNo", groomer.phoneNo);
    setValue("email", groomer.email);
    setValue("aadharNo", groomer.aadharNo);
    setValue("address", groomer.address);
    setValue("cityId", groomer.cityId);
    setValue("areaId", groomer.areaId);
    setValue("shopName", groomer.shopName);
    setValue("rating", groomer.rating);
    setValue("shopPhoneNo", groomer.shopPhoneNo);
    setValue("shopAddress", groomer.shopAddress);
    setValue("noOfSlots", groomer.noOfSlots);
    setValue("status", groomer.status);

    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Groomers Request</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredGroomers = groomers.filter(
              (groomer) =>
                groomer.firstName.toLowerCase().includes(query) ||
                groomer.lastName.toLowerCase().includes(query) ||
                groomer.email.toLowerCase().includes(query) ||
                groomer.phoneNo.includes(query)
            );
            setFiltered(filteredGroomers);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Shop Name</th>
            <th>City</th>
            <th>Area</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((groomer) => (
            <tr key={groomer.groomerId}>
              <td>
                {groomer.firstName} {groomer.lastName}
              </td>
              <td>{groomer.email}</td>
              <td>{groomer.phoneNo}</td>
              <td>{groomer.shopName}</td>
              <td>{groomer.cityName}</td>
              <td>{groomer.areaName}</td>
              <td>{groomer.status}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewGroomer(groomer)}>
                  View
                </button>
                <button className="btn btn-sm btn-success mx-2" onClick={() => handleApproveGroomer(groomer.groomerId)}>
                  Approve
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteGroomer(groomer.groomerId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Groomer Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" {...register("firstName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" {...register("lastName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="text" {...register("phoneNo")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" {...register("shopName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" {...register("rating")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Shop Phone No</Form.Label>
              <Form.Control type="text" {...register("shopPhoneNo")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Shop Address</Form.Label>
              <Form.Control type="text" {...register("shopAddress")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" {...register("status")} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
