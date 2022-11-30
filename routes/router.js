const passwordRoute = require("./passwordRoute");
const authRoute = require("./authRoute");

module.exports = function (app) {
  app.get("/api/user/:userId/records/get", passwordRoute.getAllRecords);
  app.get("/api/user/:userId/records/get/:recordId", passwordRoute.getRecord);
  app.post("/api/user/:userId/records/add", passwordRoute.addRecord);
  app.put("/api/user/:userId/records/edit/:recordId", passwordRoute.editRecord);
  app.delete(
    "/api/:recordIdrecords/delete/:recordId",
    passwordRoute.deleteRecord
  );
  app.post("/api/auth/register", authRoute.registerUser);
  app.post("/api/auth/login", authRoute.loginUser);
  app.get("/api/auth/logout", authRoute.logoutUser);
  app.get("/api/auth/check", authRoute.checkUser);
};
