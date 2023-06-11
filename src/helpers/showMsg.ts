import { toast, ToastOptions } from "react-toastify";

const showMsg = (message: string, options: ToastOptions = {}) => {
  const toastOptions: ToastOptions = {
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
