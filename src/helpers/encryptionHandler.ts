import crypto from "crypto";
const secret = process.env.CRYPTO_SCRT;
import { IRecord } from "@/types/schemas";

export const encrypt = (password: string) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);
  const encryptedPW = Buffer.concat([cipher.update(password), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    password: encryptedPW.toString("hex"),
  };
};

export const decrypt = (encryption: IRecord) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex")
  );
  const decryptedPW = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);
  return decryptedPW.toString();
};
