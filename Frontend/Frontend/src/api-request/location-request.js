import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;


export async function getCitiesAndLocations() {
  try {
    const response = await axios.get(`${base_url}/address/cities-areas`);
    return {
      status: response.data.status === "success",
      message: "Fetched cities and areas successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching cities and locations:", error);
    return handleAxiosError(error);
  }
}

export async function getFoodShopsByCityId(cityId) {
  try {
    const response = await axios.get(`${base_url}/address/food-shops/city/${cityId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched food shops by city ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching food shops by city ID:", error);
    return handleAxiosError(error);
  }
}

export async function getFoodShopsByAreaId(areaId) {
  try {
    const response = await axios.get(`${base_url}/address/food-shops/area/${areaId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched food shops by area ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching food shops by area ID:", error);
    return handleAxiosError(error);
  }
}

export async function getSittersByCityId(cityId) {
  try {
    const response = await axios.get(`${base_url}/address/sitters/city/${cityId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched sitters by city ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching sitters by city ID:", error);
    return handleAxiosError(error);
  }
}

export async function getSittersByAreaId(areaId) {
  try {
    const response = await axios.get(`${base_url}/address/sitters/area/${areaId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched sitters by area ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching sitters by area ID:", error);
    return handleAxiosError(error);
  }
}

export async function getGroomersByCityId(cityId) {
  try {
    const response = await axios.get(`${base_url}/address/groomers/city/${cityId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched groomers by city ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching groomers by city ID:", error);
    return handleAxiosError(error);
  }
}

export async function getGroomersByAreaId(areaId) {
  try {
    const response = await axios.get(`${base_url}/address/groomers/area/${areaId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched groomers by area ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching groomers by area ID:", error);
    return handleAxiosError(error);
  }
}

export async function getVeterinariesByCityId(cityId) {
  try {
    const response = await axios.get(`${base_url}/address/veterinaries/city/${cityId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched veterinaries by city ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinaries by city ID:", error);
    return handleAxiosError(error);
  }
}

export async function getVeterinariesByAreaId(areaId) {
  try {
    const response = await axios.get(`${base_url}/address/veterinaries/area/${areaId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched veterinaries by area ID successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinaries by area ID:", error);
    return handleAxiosError(error);
  }
}
