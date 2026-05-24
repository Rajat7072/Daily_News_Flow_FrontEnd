import axios from "axios";
const local_host = import.meta.env.VITE_LOCAL_HOST;
export const useDeleteApi = async (apiUrl, params) => {
  try {
    const response = await axios.delete(`${local_host}${apiUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { params },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Unknown Error" };
  }
};
