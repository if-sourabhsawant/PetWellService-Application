import React, { useEffect, useState } from "react";
import { getSitterListByStatus, updateSitterStatus } from "../../api-request/admin-request";
import { useForm } from "react-hook-form";
import { flattenObject } from "../../utils/helper-functions";
import Swal from "sweetalert2";
import { Form, Modal } from "react-bootstrap";

export default function SitterRequests() {
  const { register, reset, setValue } = useForm();
  const [sitters, setSitters] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchSitters = async () => {
    try {
      const sitterResponse = await getSitterListByStatus("PENDING");

      const flatUserData = sitterResponse.data.map((data) => flattenObject(data));

      setSitters(flatUserData);
      setFiltered(flatUserData);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch sitter requests", "error");
    }
  };

  useEffect(() => {
    fetchSitters();
  }, []);

  const handleApproveSitter = async (sitterId) => {
    try {
      const response = await updateSitterStatus(sitterId, "APPROVED");
      if (response.status) {
        Swal.fire("Success", "Sitter request approved successfully", "success");
        fetchSitters();
      } else {
        Swal.fire("Error", "Failed to approve request", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to approve sitter request", "error");
    }
  };

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
          await updateSitterStatus(sitterId, "DENIAL");
          Swal.fire("Deleted!", "Sitter request has been deleted.", "success");
          fetchSitters();
        } catch (error) {
          Swal.fire("Error", "Failed to delete sitter request", "error");
        }
      }
    });
  };

  const handleViewSitter = (sitter) => {
    setValue("firstName", sitter["user.firstName"]);
    setValue("lastName", sitter["user.lastName"]);
    setValue("phoneNo", sitter["user.phoneNo"]);
    setValue("email", sitter["user.email"]);
    setValue("aadharNo", sitter["user.aadharNo"]);
    setValue("address", sitter["user.address"]);
    setValue("cityName", sitter["user.city.cityName"]);
    setValue("areaName", sitter["user.area.areaName"]);
    setValue("rating", sitter["rating"]);
    setValue("centerPhoneNo", sitter["centerPhoneNo"]);
    setValue("centerAddress", sitter["centerAddress"]);
    setValue("city.cityName", sitter["city.cityName"]);
    setValue("area.areaName", sitter["area.areaName"]);
    setValue("noOfSlots", sitter["noOfSlots"]);
    setValue("status", sitter["status"]);
    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Sitters Request</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Name, Email, Phone"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filteredSitters = sitters.filter(
              (sitter) =>
                sitter["user.firstName"].toLowerCase().includes(query) ||
                sitter["user.lastName"].toLowerCase().includes(query) ||
                sitter["user.email"].toLowerCase().includes(query) ||
                sitter["user.phoneNo"].includes(query)
            );
            setFiltered(filteredSitters);
          }}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>City</th>
            <th>Area</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sitter) => (
            <tr key={sitter["sitterId"]}>
              <td>
                {sitter["user.firstName"]} {sitter["user.lastName"]}
              </td>
              <td>{sitter["user.email"]}</td>
              <td>{sitter["user.phoneNo"]}</td>
              <td>{sitter["rating"]}</td>
              <td>{sitter["user.city.cityName"]}</td>
              <td>{sitter["user.area.areaName"]}</td>
              <td>{sitter["status"]}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewSitter(sitter)}>
                  View
                </button>
                <button className="btn btn-sm btn-success mx-2" onClick={() => handleApproveSitter(sitter["sitterId"])}>
                  Approve
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSitter(sitter["sitterId"])}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Sitter Request</Modal.Title>
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
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="text" {...register("cityName")} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="text" {...register("areaName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" {...register("rating")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Center Phone No</Form.Label>
              <Form.Control type="text" {...register("centerPhoneNo")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Center Address</Form.Label>
              <Form.Control type="text" {...register("centerAddress")} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Center City</Form.Label>
              <Form.Control type="text" {...register("city.cityName")} readOnly />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Center Area</Form.Label>
              <Form.Control type="text" {...register("area.areaName")} readOnly />
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
