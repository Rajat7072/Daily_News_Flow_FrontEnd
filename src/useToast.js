// useToast.js
import { toast } from "react-toastify";

export const useToast = () => {
  return (msg, duration = 2000, icon = "😅", position = "top-right") => {
    toast(icon + msg, {
      position: position,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
};
