import { IRecord } from "@/types/schemas";

const convertToCsv = (records: IRecord[]): any[][] => {
  const csvData: any[][] = [];
  const headers = ["TITLE", "URL", "USERNAME", "PASSWORD"];
  csvData.push(headers);
  records.forEach((record) => {
    let fieldsArray = [];
    fieldsArray.push(record.title);
    fieldsArray.push(record.url);
    fieldsArray.push(record.username);
    fieldsArray.push(record.password);
    csvData.push(fieldsArray);
  });
  return csvData;
};

export default convertToCsv;
