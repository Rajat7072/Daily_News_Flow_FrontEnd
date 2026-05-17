import axios from "axios";
const local_host = import.meta.env.VITE_LOCAL_HOST;

export const useGetApi = async (apiUrl) => {
  try {
    const response = await axios.get(`${local_host}${apiUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Unknown Error" };
  }
};

export const useGetFilterApi = async (apiUrl, filterQuery) => {
  try {
    const response = await axios.get(`${local_host}${apiUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: filterQuery,
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Unknown Error" };
  }
};
