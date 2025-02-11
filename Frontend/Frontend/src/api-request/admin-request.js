import axios from "axios";
import { handleAxiosError } from "../utils/helper-functions";

const base_url = process.env.REACT_APP_API_BASE_URL;



export async function createPetCategory(categoryData) {
  try {
    const response = await axios.post(`${base_url}/admin/categories`, categoryData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating pet category:", error);
    return handleAxiosError(error);
  }
}

export async function createFoodShop(shopData) {
  try {
    const response = await axios.post(`${base_url}/admin/food-shops`, shopData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating food shop:", error);
    return handleAxiosError(error);
  }
}


export async function adminLogin(credentials) {
  try {
    const response = await axios.post(`${base_url}/admin/login`, credentials);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error during admin login:", error);
    return handleAxiosError(error);
  }
}

export async function getGroomerListByStatus(status) {
  try {
    const response = await axios.get(`${base_url}/admin/groomer/status/${status}`);
    return {
      status: response.data.status === "success",
      message: "Fetched groomer list successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching groomer list by status:", error);
    return handleAxiosError(error);
  }
}

export async function getVeterinaryListByStatus(status) {
  try {
    const response = await axios.get(`${base_url}/admin/veterinarians/status/${status}`);
    return {
      status: response.data.status === "success",
      message: "Fetched veterinary list successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching veterinary list by status:", error);
    return handleAxiosError(error);
  }
}

export async function getSitterListByStatus(status) {
  try {
    const response = await axios.get(`${base_url}/admin/sitters/status/${status}`);
    return {
      status: response.data.status === "success",
      message: "Fetched sitter list successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching sitter list by status:", error);
    return handleAxiosError(error);
  }
}

export async function getAllPets() {
  try {
    const response = await axios.get(`${base_url}/admin/pets`);
    return {
      status: response.data.status === "success",
      message: "Fetched all pets successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching all pets:", error);
    return handleAxiosError(error);
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${base_url}/admin/users`);
    return {
      status: response.data.status === "success",
      message: "Fetched all users successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return handleAxiosError(error);
  }
}

export async function getUserWithPetDetails(userId) {
  try {
    const response = await axios.get(`${base_url}/admin/users/${userId}`);
    return {
      status: response.data.status === "success",
      message: "Fetched user with pet details successfully",
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching user with pet details:", error);
    return handleAxiosError(error);
  }
}



export async function updateCategoryName(categoryId, newName) {
  try {
    const response = await axios.put(`${base_url}/admin/categories/${categoryId}?newName=${newName}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating category name:", error);
    return handleAxiosError(error);
  }
}

export async function updateGroomerStatus(groomerId, status) {
  try {
    const response = await axios.put(`${base_url}/admin/groomers/${groomerId}/status?status=${status}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating groomer status:", error);
    return handleAxiosError(error);
  }
}

export async function updateSitterStatus(sitterId, status) {
  try {
    const response = await axios.put(`${base_url}/admin/sitters/${sitterId}/status?status=${status}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating sitter status:", error);
    return handleAxiosError(error);
  }
}

export async function updateVeterinaryStatus(veterinaryId, status) {
  try {
    const response = await axios.put(`${base_url}/admin/veterinarians/${veterinaryId}/status?status=${status}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating veterinary status:", error);
    return handleAxiosError(error);
  }
}

export async function updateFoodShop(foodShopId, shopData) {
  try {
    const response = await axios.put(`${base_url}/admin/food-shops/${foodShopId}`, shopData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error updating food shop:", error);
    return handleAxiosError(error);
  }
}


export async function deleteGroomer(groomerId) {
  try {
    const response = await axios.delete(`${base_url}/admin/groomers/${groomerId}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error deleting groomer:", error);
    return handleAxiosError(error);
  }
}

export async function deleteSitter(sitterId) {
  try {
    const response = await axios.delete(`${base_url}/admin/sitters/${sitterId}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error deleting sitter:", error);
    return handleAxiosError(error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${base_url}/admin/users/${userId}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return handleAxiosError(error);
  }
}

export async function deleteVeterinary(veterinaryId) {
  try {
    const response = await axios.delete(`${base_url}/admin/veterinarians/${veterinaryId}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error deleting veterinary:", error);
    return handleAxiosError(error);
  }
}

export async function deleteFoodShop(foodShopId) {
  try {
    const response = await axios.delete(`${base_url}/admin/food-shops/${foodShopId}`);
    return {
      status: response.data.status === "success",
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error deleting food shop:", error);
    return handleAxiosError(error);
  }
}
