import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getGroomerInfoByGroomerId } from "../../api-request/groomer-request";
import { createGroomerAppointment } from "../../api-request/user-request";

export default function UserBookGroomerAppointments() {
  const { id } = useParams();
  const userData = useSelector((state) => state.user.userInfo);
  const [groomer, setGroomer] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getGroomerInfoByGroomerId(id);

    if (response.status) {
      setGroomer(response.data);
    } else {
      toast.error("Error while getting appointment data " + response.message);
    }
    console.log("response", response);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      groomerId: groomer.groomerId,
      slotId: selectedSlot,
      date: appointmentDate,
      note: note,
    };
    console.log("Appointment Data:", appointmentData);
    const response = await createGroomerAppointment(userData.userId, groomer.groomerId, selectedSlot, appointmentDate, note);

    console.log("response", response);
    if (response.status) {
      toast.success("Appointment Booked successfully with Groomer");
      setTimeout(() => {
        navigate("/user/appointments");
      }, 1500);
    } else {
      toast.error("Error while booking appointment " + response.message);
    }
  };

  
  if (!groomer) {
    return <div>Loading groomer details...</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3>Book Appointment with {groomer.shopName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="section mt-4">
          <h4>Groomer Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Groomer Name</label>
              <input type="text" className="form-control" value={`${groomer.user.firstName} ${groomer.user.lastName}`} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Rating</label>
              <input type="text" className="form-control" value={groomer.rating} readOnly />
            </div>
          </div>
        </div>

        <div className="section mt-4">
          <h4>Shop Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Shop Name</label>
              <input type="text" className="form-control" value={groomer.shopName} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Shop Phone No</label>
              <input type="text" className="form-control" value={groomer.shopPhoneNo} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Shop Address</label>
              <input type="text" className="form-control" value={groomer.shopAddress} readOnly />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Center City</label>
              <input type="text" className="form-control" value={groomer.city.cityName} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Center Are</label>
              <input type="text" className="form-control" value={groomer.area.areaName} readOnly />
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
                {groomer.slots
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
