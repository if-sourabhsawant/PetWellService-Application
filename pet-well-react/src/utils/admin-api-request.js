import axios from "axios";

const base_url = "http://localhost:8080/api/v1";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${base_url}/admin/users`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { cities: [], areas: [] };
  }
};export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${base_url}/admin/users/${userId}`);
    console.log(response.data.data);

    return { status: response.data.message === "success",data: response.data.data, };
  } catch (error) {
    console.error("Error fetching cities and areas:", error);
    return { status: false, error };
  }
};



// const data = await fetchUsers();
// console.log(data);


