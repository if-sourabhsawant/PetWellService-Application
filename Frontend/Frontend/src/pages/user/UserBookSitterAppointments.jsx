import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSitterAppointment } from "../../api-request/user-request";
import { getSitterInfoBySitterId } from "../../api-request/sitter-request";

export default function UserBookSitterAppointments() {
  const { id } = useParams();
  const userData = useSelector((state) => state.user.userInfo);
  const [sitter, setSitter] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getSitterInfoBySitterId(id);
    if (response.status) {
      setSitter(response.data);
    } else {
      toast.error("Error while getting appointment data " + response.message);
    }
    console.log("response", response);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      sitterId: sitter.sitterId,
      slotId: selectedSlot,
      date: appointmentDate,
      note: note,
    };
    console.log("Appointment Data:", appointmentData);

    const response = await createSitterAppointment(userData.userId, sitter.sitterId, selectedSlot, appointmentDate, note);

    console.log("response", response);

    if (response.status) {
      toast.success("Appointment Book successfully with Sitter");
      setTimeout(() => {
        navigate("/user/appointments");
      }, 1500);
    } else {
      toast.error("Error while booking appointment " + response.message);
    }
  };

  if (!sitter) {
    return <div>Loading sitter details...</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3>
        Book Appointment with {sitter.user.firstName} {sitter.user.lastName}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="section mt-4">
          <h4>Sitter Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Sitter Name</label>
              <input type="text" className="form-control" value={`${sitter.user.firstName} ${sitter.user.lastName}`} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Rating</label>
              <input type="text" className="form-control" value={sitter.rating} readOnly />
            </div>
          </div>
        </div>

        <div className="section mt-4">
          <h4>Center Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Center Phone No</label>
              <input type="text" className="form-control" value={sitter.centerPhoneNo} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Center Address</label>
              <input type="text" className="form-control" value={sitter.centerAddress} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Center City</label>
              <input type="text" className="form-control" value={sitter.city.cityName} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Center Are</label>
              <input type="text" className="form-control" value={sitter.area.areaName} readOnly />
            </div>
          </div>
        </div>

        <div className="section mt-4">
          <h4>Appointment Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Select Slot</label>
              <select className="form-select" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
                <option value="">Select a Slot</option>
                {sitter.slots
                  .filter((slot) => slot.available)
                  .map((slot) => (
                    <option key={slot.slotId} value={slot.slotId}>
                      {slot.slotTime}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Select Date</label>
              <input type="date" className="form-control" min={new Date().toISOString().split("T")[0]} max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Appointment Note</label>
              <textarea
                className="form-control"
                rows="1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter any additional information"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
