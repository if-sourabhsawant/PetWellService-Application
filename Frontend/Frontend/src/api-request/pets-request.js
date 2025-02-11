import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;





export async function getAllPetsCategories() {
  try {
    const response = await axios.get(`${base_url}/pets/categories`);
    return { status: response.data.status === "success", message: "Fetched all pet categories successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching all pet categories:", error);
    return handleAxiosError(error);
  }
}


export async function getAllPetsCategoriesAndBreeds() {
  try {
    const response = await axios.get(`${base_url}/pets/categories-breeds`);
    return { status: response.data.status === "success", message: "Fetched all pet categories and breeds successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching categories and breeds:", error);
    return handleAxiosError(error);
  }
}


export async function getPetDetailsByUserId(userId) {
  try {
    const response = await axios.get(`${base_url}/pets/user/${userId}`);
    return { status: response.data.status === "success", message: "Fetched pet details successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching pet details by userId:", error);
    return handleAxiosError(error);
  }
}

export async function updatePetsById(petId, petData) {
  try {
    const response = await axios.put(`${base_url}/pets/${petId}`, petData);
    return { status: response.data.status === "success", message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error updating pet:", error);
    return handleAxiosError(error);
  }
}
