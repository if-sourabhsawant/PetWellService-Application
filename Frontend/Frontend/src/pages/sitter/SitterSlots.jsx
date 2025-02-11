import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getSitterInfoByUserId } from "../../api-request/sitter-request";
import { Form, Modal } from "react-bootstrap";
import { createSlotByUserId, updateSlotBySlotId } from "../../api-request/user-request";

export default function SitterSlots() {
  const user = useSelector((state) => state.user.userInfo);
  const [slotTime, setSlotTime] = useState("");
  const [slotData, setSlotData] = useState([]);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);

  function handleCloseSlotModal() {
    setShowSlotModal(false);
    setSlotTime("");
    setIsUpdating(false);
    setCurrentSlotId(null);
  }

  const handleAddOrUpdateSlot = async () => {
    if (slotTime) {
      const payload = { slotTime, userType: "SITTER" };
      let response;

      if (isUpdating) {
        response = await updateSlotBySlotId(currentSlotId, payload);
      } else {
        response = await createSlotByUserId(user.userId, payload);
      }

      console.log("response", response);
      if (response.status) {
        toast.success(response.message);
        handleCloseSlotModal();
        fetchData();
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("Please enter a valid time.");
    }
  };

  async function fetchData() {
    const response = await getSitterInfoByUserId(user.userId);
    if (response.status) {
      setSlotData(response.data.slots);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSlot = () => {
    setShowSlotModal(true);
  };

  const handleUpdateSlot = (slot) => {
    setSlotTime(slot.slotTime);
    setCurrentSlotId(slot.slotId);
    setIsUpdating(true);
    setShowSlotModal(true);
  };

  return (
    <div>
      <ToastContainer />

      <div className="d-flex justify-content-between">
        <h3>Available Slots</h3>
        <button type="button" className="btn btn-primary" onClick={handleAddSlot}>
          Add Slot
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Slot Time</th>
            <th scope="col">Available</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {slotData?.map((slot, index) => (
            <tr key={slot.slotId} className={slot.available ? "" : "table-danger"}>
              <th scope="row">{index + 1}</th>
              <td>{slot.slotTime}</td>
              <td>{slot.available ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => handleUpdateSlot(slot)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal show={showSlotModal} onHide={handleCloseSlotModal} backdrop="static" scrollable={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdating ? "Update Slot" : "Add Slot"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" value={slotTime} onChange={(e) => setSlotTime(e.target.value)} />
                </Form.Group>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleAddOrUpdateSlot}>
            {isUpdating ? "Update" : "Add"}
          </button>
          <button className="btn btn-secondary" onClick={handleCloseSlotModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
