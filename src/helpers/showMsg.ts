import { toast } from "react-toastify";

const showMsg = (message, options = {}) => {
  let toastOptions = {
    position: "bottom-center",
    type: "info",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    theme: "dark",
  };
  toast(message, { ...options, ...toastOptions });
};

export default showMsg;
