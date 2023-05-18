import showMsg from "./showMsg";

const copyToClipboard = (value: string): void => {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        showMsg("Password copied!");
      })
      .catch((error: Error) => {
        console.error("Failed to copy text: ", error);
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    if (document.body) {
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showMsg("Password copied!");
    }
  }
};

export default copyToClipboard;
