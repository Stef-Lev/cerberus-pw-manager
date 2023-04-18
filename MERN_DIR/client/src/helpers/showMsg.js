import { toast } from 'react-toastify';

const showMsg = (message, options) => {
  let toastOptions;
  if (options) {
    toastOptions = options;
  } else {
    toastOptions = {
      position: 'bottom-center', 
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      theme: 'dark',
    };
  }
  toast(message, toastOptions);
};

export default showMsg;
