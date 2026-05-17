import axios from "axios";
const local_host = import.meta.env.VITE_LOCAL_HOST;
export const useDeleteApi = async (apiUrl, heading) => {
  try {
    const response = await axios.delete(`${local_host}${apiUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { heading },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Unknown Error" };
  }
};
