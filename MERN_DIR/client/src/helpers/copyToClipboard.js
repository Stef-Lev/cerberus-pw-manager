import showMsg from './showMsg';

const copyToClipboard = value => {
  navigator.clipboard.writeText(value);
  showMsg('Password copied!');
};

export default copyToClipboard;
