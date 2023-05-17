const convertToCsv = (records) => {
  let csvData = [];
  let headers = ["TITLE", "URL", "USERNAME", "PASSWORD"];
  csvData.push(headers);
  records.forEach((rec) => {
    let fieldsArray = [];
    fieldsArray.push(rec.title);
    fieldsArray.push(rec.url);
    fieldsArray.push(rec.username);
    fieldsArray.push(rec.password);
    csvData.push(fieldsArray);
  });
  return csvData;
};

export default convertToCsv;
