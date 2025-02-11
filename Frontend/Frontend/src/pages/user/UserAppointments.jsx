import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAppointmentsByUserId } from "../../api-request/user-request";

export default function UserAppointments() {
  const userData = useSelector((state) => state.user.userInfo);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getAppointmentsByUserId(userData.userId);

    if (response.status) {
      console.log(response.data);
      setAppointments(response.data);
    }
  }

  return (
    <div className="section">
      <h3>Appointments</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Type</th>
            <th>To Whom</th>
            <th>Date</th>
            <th>Slot Time</th>
            <th>Status</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.appointmentId + appointment.slotTime}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.appointmentType}</td>
                <td>{appointment.toWhomName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slotTime}</td>
                <td>{appointment.status}</td>
                <td>{appointment.note}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No appointments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
