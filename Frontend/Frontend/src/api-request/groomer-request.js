import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function getAllGroomers() {
  try {
    const response = await axios.get(`${base_url}/groomer`);
    return { status: response.data.status === "success", message: "Fetched groomers successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching groomers:", error);
    return handleAxiosError(error);
  }
}


export async function getGroomerInfoByUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/groomer/${userId}`);
    return { status: response.data.status === "success", message: "Fetched groomer info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching groomer info:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentsByGroomerId(userId) {
  try {
    const response = await axios.get(`${base_url}/groomer/${userId}/appointments`);
    return { status: response.data.status === "success", message: "Fetched appointments successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return handleAxiosError(error);
  }
}


export async function getGroomerInfoByGroomerId(groomerId) {
  try {
    const response = await axios.get(`${base_url}/groomer/groomerId/${groomerId}`);
    return { status: response.data.status === "success", message: "Fetched groomer info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching groomer info by groomerId:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentInfoByAppointmentId(appointmentId) {
  try {
    const response = await axios.get(`${base_url}/groomer/appointments/${appointmentId}/info`);
    return { status: response.data.status === "success", message: "Fetched appointment info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching appointment info:", error);
    return handleAxiosError(error);
  }
}


export async function updateAppointmentStatus(appointmentId, status) {
  try {
    const response = await axios.put(`${base_url}/groomer/appointments/${appointmentId}/status?status=${status}`);
    return { status: response.data.status === "success", message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return handleAxiosError(error);
  }
}


export async function updateGroomerInfoByGroomerId(groomerId, groomerInfo) {
  try {
    const response = await axios.put(`${base_url}/groomer/${groomerId}`, groomerInfo);
    return { status: response.data.status === "success", message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error updating groomer info:", error);
    return handleAxiosError(error);
  }
}
