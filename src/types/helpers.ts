import { Connection } from "mongoose";
export interface IAvatarsPositions {
  [key: number]: string;
}

export interface IDBConnection {
  connection: Connection;
  closeConnection: () => Promise<void>;
}

export interface IPasswordChecker {
  percent: string;
  color: string;
  text: string;
}

export interface INewUserData {
  fullname: string;
  username: string;
  password: string;
  passwordCheck: string;
}

export interface IRegisterResponse {
  message: string;
}
