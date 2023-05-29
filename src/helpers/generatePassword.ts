import { IGeneratePassword } from "@/types/helpers";

const generatePassword = ({
  length,
  numbers,
  symbols,
  lower,
  upper,
}: IGeneratePassword) => {
  let charset = "";
  let numbersCharset = "";
  let symbolsCharset = "";
  let lowerCharset = "";
  let upperCharset = "";

  if (numbers) {
    numbersCharset = "0123456789";
  }
  if (symbols) {
    symbolsCharset = "!@#$%^&*_";
  }
  if (lower) {
    lowerCharset = "abcdefghijklmnopqrstuvwxyz";
  }
  if (upper) {
    upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  charset = numbersCharset + symbolsCharset + lowerCharset + upperCharset;
  let finalPassword = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    finalPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  return finalPassword;
};

export default generatePassword;
