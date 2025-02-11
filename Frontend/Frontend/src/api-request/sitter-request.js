import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function getAllSitters() {
  try {
    const response = await axios.get(`${base_url}/sitters`);
    return { status: response.data.status === "success", message: "Fetched all sitters successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching sitters:", error);
    return handleAxiosError(error);
  }
}


export async function getSitterInfoByUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/sitters/${userId}`);
    return { status: response.data.status === "success", message: "Fetched sitter info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching sitter info:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentsBySitterUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/sitters/${userId}/appointments`);
    return { status: response.data.status === "success", message: "Fetched appointments successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return handleAxiosError(error);
  }
}


export async function getSitterInfoBySitterId(sitterId) {
  try {
    const response = await axios.get(`${base_url}/sitters/sitterId/${sitterId}`);
    return { status: response.data.status === "success", message: "Fetched sitter info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching sitter info:", error);
    return handleAxiosError(error);
  }
}


export async function getAppointmentInfoByAppointmentId(appointmentId) {
  try {
    const response = await axios.get(`${base_url}/sitters/appointments/${appointmentId}/info`);
    return { status: response.data.status === "success", message: "Fetched appointment info successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching appointment info:", error);
    return handleAxiosError(error);
  }
}


export async function updateAppointmentStatus(appointmentId, status) {
  try {
    const response = await axios.put(`${base_url}/sitters/appointments/${appointmentId}/status?status=${status}`);
    return { status: response.data.status === "success", message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return handleAxiosError(error);
  }
}


export async function updateSitterInfoBySitterId(sitterId, sitterData) {
  try {
    const response = await axios.put(`${base_url}/sitters/${sitterId}`, sitterData);
    return { status: response.data.status === "success", message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error updating sitter info:", error);
    return handleAxiosError(error);
  }
}
