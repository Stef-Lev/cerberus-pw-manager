import { Document } from "mongoose";

export interface IUser extends Document {
  fullname?: string;
  avatar?: number;
  username: string;
  password: string;
  passwordCheck?: string;
  records?: Array<{
    title: string;
    url: string;
    username: string;
    password: string;
    logo: string;
    iv: string;
  }>;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export interface IRecord extends Document {
  id?: string;
  title: string;
  url?: string;
  username: string;
  password: string;
  logo: string;
  iv: string;
}
