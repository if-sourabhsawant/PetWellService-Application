import React, { useEffect, useState } from "react";
import { getVeterinaryListByStatus, updateVeterinaryStatus } from "../../api-request/admin-request";
import { flattenVeterinaryData } from "../../utils/helper-functions";
import { Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function VeterinaryRequest() {
  const { register, reset, setValue } = useForm();
  const [veterinaries, setVeterinaries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchVeterinaries = async () => {
    try {
      const veterinaryResponse = await getVeterinaryListByStatus("PENDING");

      const flatUserData = veterinaryResponse.data.map((data) => flattenVeterinaryData(data));

      setVeterinaries(flatUserData);
      setFiltered(flatUserData);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch veterinary requests", "error");
    }
  };

  useEffect(() => {
    fetchVeterinaries();
  }, []);

  const handleApproveVeterinary = async (veterinaryId) => {
    try {
      const response = await updateVeterinaryStatus(veterinaryId, "APPROVED");
      if (response.status) {
        Swal.fire("Success", "Veterinary request approved successfully", "success");
        fetchVeterinaries();
      } else {
        Swal.fire("Error", "Failed to approve request", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to approve veterinary request", "error");
    }
  };

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
          await updateVeterinaryStatus(veterinaryId, "DENIAL");
          Swal.fire("Deleted!", "Veterinary request has been deleted.", "success");
          fetchVeterinaries();
        } catch (error) {
          Swal.fire("Error", "Failed to delete veterinary request", "error");
        }
      }
    });
  };

  const handleViewVeterinary = (veterinary) => {
    setValue("firstName", veterinary.firstName);
    setValue("lastName", veterinary.lastName);
    setValue("phoneNo", veterinary.phoneNo);
    setValue("email", veterinary.email);
    setValue("aadharNo", veterinary.aadharNo);
    setValue("address", veterinary.address);
    setValue("cityId", veterinary.cityId);
    setValue("areaId", veterinary.areaId);
    setValue("specialization", veterinary.specialization);
    setValue("experience", veterinary.experience);
    setValue("licenseNo", veterinary.licenseNo);
    setValue("clinicName", veterinary.clinicName);
    setValue("clinicPhoneNo", veterinary.clinicPhoneNo);
    setValue("clinicAddress", veterinary.clinicAddress);
    setValue("noOfSlots", veterinary.noOfSlots);
    setValue("status", veterinary.status);

    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Veterinaries Request</h3>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredVeterinaries = veterinaries.filter(
              (veterinary) =>
                veterinary.firstName.toLowerCase().includes(query) ||
                veterinary.lastName.toLowerCase().includes(query) ||
                veterinary.email.toLowerCase().includes(query) ||
                veterinary.phoneNo.includes(query)
            );
            setFiltered(filteredVeterinaries);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>City</th>
            <th>Area</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((veterinary) => (
            <tr key={veterinary.veterinaryId}>
              <td>
                {veterinary.firstName} {veterinary.lastName}
              </td>
              <td>{veterinary.email}</td>
              <td>{veterinary.phoneNo}</td>
              <td>{veterinary.specialization}</td>
              <td>{veterinary.cityName}</td>
              <td>{veterinary.areaName}</td>
              <td>{veterinary.status}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewVeterinary(veterinary)}>
                  View
                </button>
                <button className="btn btn-sm btn-success mx-2" onClick={() => handleApproveVeterinary(veterinary.veterinaryId)}>
                  Approve
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteVeterinary(veterinary.veterinaryId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Veterinary Request</Modal.Title>
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
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" {...register("specialization")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text" {...register("experience")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>License No</Form.Label>
              <Form.Control type="text" {...register("licenseNo")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Clinic Name</Form.Label>
              <Form.Control type="text" {...register("clinicName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Clinic Phone No</Form.Label>
              <Form.Control type="text" {...register("clinicPhoneNo")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Clinic Address</Form.Label>
              <Form.Control type="text" {...register("clinicAddress")} readOnly />
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
