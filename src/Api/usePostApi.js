import axios from "axios";
const local_host = import.meta.env.VITE_LOCAL_HOST;

export const usePostApi = async (apiUrl, params) => {
  try {
    const headerType =
      apiUrl === "/newsapi/upload"
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };
    const response = await axios.post(`${local_host}${apiUrl}`, params, {
      headers: headerType,
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response ? error.response.data : "An error occurred",
    };
  }
};
