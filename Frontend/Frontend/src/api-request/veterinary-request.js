import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function getAllVeterinaries() {
  try {
    const response = await axios.get(`${base_url}/veterinary`);
    return {
      status: response.data.status === "success",
      message: "Fetched all veterinaries successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinaries:", error);
    return handleAxiosError(error);
  }
}


export async function getVeterinaryInfoByUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/veterinary/${userId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched veterinary info successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinary info:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentsByVeterinaryUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/veterinary/${userId}/appointments`);
    return {
      status: response.data.status === "success",
      message: "Fetched appointments successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return handleAxiosError(error);
  }
}


export async function getVeterinaryInfoByVeterinaryId(veterinaryId) {
  try {
    const response = await axios.get(`${base_url}/veterinary/veterinaryId/${veterinaryId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched veterinary info successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinary info:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentInfoByAppointmentId(appointmentId) {
  try {
    const response = await axios.get(`${base_url}/veterinary/appointments/${appointmentId}/info`);
    return {
      status: response.data.status === "success",
      message: "Fetched appointment info successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching appointment info:", error);
    return handleAxiosError(error);
  }
}


export async function updateAppointmentStatus(appointmentId, status) {
  try {
    const response = await axios.put(`${base_url}/veterinary/appointments/${appointmentId}/status?status=${status}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return handleAxiosError(error);
  }
}


export async function updateVeterinaryInfoByVeterinaryId(veterinaryId, veterinaryData) {
  try {
    const response = await axios.put(`${base_url}/veterinary/${veterinaryId}`, veterinaryData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating veterinary info:", error);
    return handleAxiosError(error);
  }
}
