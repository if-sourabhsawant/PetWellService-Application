// src/utils/fetchData.js
import axios from "axios";

const base_url = "http://localhost:8080/api/v1";
export const fetchCitiesAndAreas = async () => {
  try {
    const response = await axios.get(`${base_url}/address/cities-areas`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { cities: [], areas: [] };
  }
};
export const fetchCategoriesAndBreeds = async () => {
  try {
    const response = await axios.get(`${base_url}/pets/categories-breeds`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { cities: [], areas: [] };
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${base_url}/auth/register`, userData);

    return { status: response.data.message === "success" };
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { status: false, error };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${base_url}/auth/login`, userData);

    return {
      status: response.data.message === "success",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { status: false, error };
  }
};
