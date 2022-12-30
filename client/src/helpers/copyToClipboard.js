const copyToClipboard = value => {
  navigator.clipboard.writeText(value);
};

export default copyToClipboard;
