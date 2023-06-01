import { IRecord, IUser } from "./schemas";

export interface IHomePage {
  length: number;
  numbers: boolean;
  symbols: boolean;
  lower: boolean;
  upper: boolean;
}

export interface IRecordNewPageProps {
  record: IRecord;
  user: IUser;
}
