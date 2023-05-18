import { Connection } from "mongoose";
export interface IAvatarsPositions {
  [key: number]: string;
}

export interface IDBConnection {
  connection: Connection;
  closeConnection: () => Promise<void>;
}
