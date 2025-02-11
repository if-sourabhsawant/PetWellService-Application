import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function createVeterinaryAppointment(userId, veterinaryId, slotId, date, note, appointmentData) {
  try {
    const response = await axios.post(
      `${base_url}/appointments/${userId}/appointments/veterinary?veterinaryId=${veterinaryId}&slotId=${slotId}&date=${date}&note=${note}`,
      appointmentData
    );
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating veterinary appointment:", error);
    return handleAxiosError(error);
  }
}


export async function createSitterAppointment(userId, sitterId, slotId, date, note, appointmentData) {
  try {
    const response = await axios.post(
      `${base_url}/appointments/${userId}/appointments/sitter?sitterId=${sitterId}&slotId=${slotId}&date=${date}&note=${note}`,
      appointmentData
    );
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating sitter appointment:", error);
    return handleAxiosError(error);
  }
}


export async function createGroomerAppointment(userId, groomerId, slotId, date, note, appointmentData) {
  try {
    const response = await axios.post(
      `${base_url}/appointments/${userId}/appointments/groomer?groomerId=${groomerId}&slotId=${slotId}&date=${date}&note=${note}`,
      appointmentData
    );
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating groomer appointment:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentsByUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/appointments/${userId}/appointments`);
    return {
      status: response.data.status === "success",
      message: "Fetched user appointments successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return handleAxiosError(error);
  }
}


export async function updateUserById(userId, userData) {
  try {
    const response = await axios.put(`${base_url}/users/${userId}`, userData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return handleAxiosError(error);
  }
}

export async function createSlotByUserId(userId, slotData) {
  try {
    const response = await axios.post(`${base_url}/users/${userId}/slots`, slotData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating slot:", error);
    return handleAxiosError(error);
  }
}

export async function updateSlotBySlotId(slotId, slotData) {
  try {
    const response = await axios.put(`${base_url}/users/${slotId}/slots`, slotData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating slot:", error);
    return handleAxiosError(error);
  }
}

export async function getUserInfoById(userId) {
  try {
    const response = await axios.get(`${base_url}/users/${userId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched user info successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching User Details:", error);
    return handleAxiosError(error);
  }
}
