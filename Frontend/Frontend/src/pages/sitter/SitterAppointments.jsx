import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getAppointmentsBySitterUserId, updateAppointmentStatus } from "../../api-request/sitter-request";
import Swal from "sweetalert2";
import { Form, Modal, Table } from "react-bootstrap";

export default function SitterAppointments() {
  const sitterId = useSelector((state) => state.user.sitterId);

  const { register, reset, setValue } = useForm();
  const [appointments, setAppointments] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPets, setSelectedPets] = useState([]);

  const handleClose = () => {
    reset();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointmentsBySitterUserId(sitterId);
      if (response.status) {
        const flatUserData = response.data
          .filter((data) => data.status !== "COMPLETED" && data.status !== "CANCEL")
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(flatUserData);
      } else {
        Swal.fire("Error", "Failed to fetch appointments", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch appointments", "error");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this appointment as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateAppointmentStatus(appointmentId, status);
          Swal.fire("Success", `Appointment marked as ${status}`, "success");
          fetchAppointments();
        } catch (error) {
          Swal.fire("Error", "Failed to update appointment status", "error");
        }
      }
    });
  };

  const handleViewAppointment = (appointment) => {
    setValue("firstName", appointment.user.firstName);
    setValue("lastName", appointment.user.lastName);
    setValue("phoneNo", appointment.user.phoneNo);
    setValue("email", appointment.user.email);
    setValue("address", appointment.user.address);
    setValue("cityName", appointment.user.city.cityName);
    setValue("areaName", appointment.user.area.areaName);
    setValue("date", appointment.date);
    setValue("slotTime", appointment.slotTime);
    setValue("note", appointment.note);
    setValue("status", appointment.status);

    setSelectedPets(appointment.pet); 

    handleShow();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Appointments Management</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>
                {appointment.user.firstName} {appointment.user.lastName}
              </td>
              <td>{appointment.user.email}</td>
              <td>{appointment.user.phoneNo}</td>
              <td>{appointment.date}</td>
              <td>{appointment.slotTime}</td>
              <td>{appointment.status}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => handleViewAppointment(appointment)}>
                  View
                </button>
                <button className="btn btn-sm btn-danger mx-2" onClick={() => handleUpdateStatus(appointment.appointmentId, "CANCEL")}>
                  Cancel
                </button>
                <button className="btn btn-sm btn-success" onClick={() => handleUpdateStatus(appointment.appointmentId, "COMPLETED")}>
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Appointment</Modal.Title>
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
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" {...register("address")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" {...register("cityName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" {...register("areaName")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" {...register("date")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Slot Time</Form.Label>
              <Form.Control type="text" {...register("slotTime")} readOnly />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control type="text" {...register("note")} readOnly />
            </Form.Group>

            <h5 className="mt-3">Pet Details</h5>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Age</th>
                  <th>Category</th>
                 
                </tr>
              </thead>
              <tbody>
                {selectedPets.length > 0 ? (
                  selectedPets.map((pet, index) => (
                    <tr key={index}>
                      <td>{pet.petName}</td>
                      <td>{pet.petAge}</td>
                      <td>{pet.category.categoryName}</td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Pets
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

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
