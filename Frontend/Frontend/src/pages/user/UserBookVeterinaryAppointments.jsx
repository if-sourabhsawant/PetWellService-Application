import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createVeterinaryAppointment } from "../../api-request/user-request";
import { getVeterinaryInfoByVeterinaryId } from "../../api-request/veterinary-request";

export default function UserBookVeterinaryAppointments() {
  const { id } = useParams();
  const userData = useSelector((state) => state.user.userInfo);
  const [veterinary, setVeterinary] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await getVeterinaryInfoByVeterinaryId(id);

    if (response.status) {
      setVeterinary(response.data);
    }
    console.log("response", response);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      veterinaryId: veterinary.veterinaryId,
      slotId: selectedSlot,
      date: appointmentDate,
      note: note,
    };
    console.log("Appointment Data:", appointmentData);
    const response = await createVeterinaryAppointment(userData.userId, veterinary.veterinaryId, selectedSlot, appointmentDate, note);
    console.log("response", response);
    if (response.status) {
      toast.success("Appointment Book successfully at Veterinary");
      setTimeout(() => {
        navigate("/user/appointments");
      }, 1500);
    } else {
      toast.error("Error while Appointment");
    }
  };

  
  if (!veterinary) {
    return <div>Loading veterinary details...</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3>Book Appointment with {veterinary.clinicName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="section mt-4">
          <h4>Veterinary Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Veterinary Name</label>
              <input type="text" className="form-control" value={`${veterinary.user.firstName} ${veterinary.user.lastName}`} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Specialization</label>
              <input type="text" className="form-control" value={veterinary.specialization} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Experience (Years)</label>
              <input type="text" className="form-control" value={veterinary.experience} readOnly />
            </div>
          </div>
        </div>

        <div className="section mt-4">
          <h4>Clinic Details</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Clinic Name</label>
              <input type="text" className="form-control" value={veterinary.clinicName} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Clinic Phone No</label>
              <input type="text" className="form-control" value={veterinary.clinicPhoneNo} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Clinic Address</label>
              <input type="text" className="form-control" value={veterinary.clinicAddress} readOnly />
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
                {veterinary.slots
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
              <input type="date" className="form-control" min={new Date().toISOString().split("T")[0]}  max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
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
