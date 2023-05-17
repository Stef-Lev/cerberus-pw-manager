import showMsg from "./showMsg";

const copyToClipboard = (value) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        showMsg("Password copied!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  } else {
    // Fallback to the old way of copying text
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showMsg("Password copied!");
  }
};

export default copyToClipboard;
