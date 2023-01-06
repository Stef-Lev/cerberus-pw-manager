const generatePassword = (
  length,
  withNumbers,
  withSymbols,
  lowerCase = true,
  upperCase
) => {
  let charset = '';
  let numbersCharset = '';
  let symbolsCharset = '';
  let lowerCharset = '';
  let upperCharset = '';

  if (withNumbers) {
    numbersCharset = '0123456789';
  }
  if (withSymbols) {
    symbolsCharset = '!@#$%^&*_';
  }
  if (lowerCase) {
    lowerCharset = 'abcdefghijklmnopqrstuvwxyz';
  }
  if (upperCase) {
    upperCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  charset = numbersCharset + symbolsCharset + lowerCharset + upperCharset;
  let finalPassword = '';

  for (let i = 0, n = charset.length; i < length; ++i) {
    finalPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  return finalPassword;
};

export default generatePassword;
