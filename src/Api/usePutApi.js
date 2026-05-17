import axios from "axios";
const local_host = import.meta.env.VITE_LOCAL_HOST;

export const usePutApi = async (apiUrl, data) => {
  try {
    if (Array.isArray(data)) {
      data = data[0];
    }
    const response = await axios.put(`${local_host}${apiUrl}`, data, {
      "Content-Type": "application/json",
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : "An error occurred",
    };
  }
};
