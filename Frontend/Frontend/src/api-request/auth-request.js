import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

export async function registerUser(userData) {
  try {
    const response = await axios.post(`${base_url}/users/register`, userData);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    if (!error.response) {
      return {
        status: false,
        message: "Network not available. Please check your internet connection.",
        error,
      };
    }
    if (error.response.status >= 400 && error.response.status < 500) {
      return {
        status: false,
        message: `Request denied: ${error.response.data.message || "Invalid request"}`,
        error,
      };
    }
    return {
      status: false,
      message: "An unexpected error occurred. Please try again later.",
      error,
    };
  }
}

export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${base_url}/Auth/login`, credentials);
    return {
      status: response.data.status === "success",
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    if (!error.response) {
      return {
        status: false,
        message: "Network not available. Please check your internet connection.",
        error,
      };
    }
    if (error.response.status >= 400 && error.response.status < 500) {
      return {
        status: false,
        message: `Request denied: ${error.response.data.message || "Invalid login credentials"}`,
        error,
      };
    }
    return {
      status: false,
      message: "An unexpected error occurred. Please try again later.",
      error,
    };
  }
}

