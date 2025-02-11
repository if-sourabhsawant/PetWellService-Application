import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function getFoodShopById(foodShopId) {
  try {
    const response = await axios.get(`${base_url}/food-shops/${foodShopId}`);
    return { status: response.data.status === "success", message: "Fetched food shop successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching food shop by ID:", error);
    return handleAxiosError(error);
  }
}


export async function getAllFoodShops() {
  try {
    const response = await axios.get(`${base_url}/food-shops`);
    return { status: response.data.status === "success", message: "Fetched all food shops successfully", data: response.data.data };
  } catch (error) {
    console.error("Error fetching food shop list:", error);
    return handleAxiosError(error);
  }
}
