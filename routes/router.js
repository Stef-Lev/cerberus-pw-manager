const passwordRoute = require("./passwordRoute");
const authRoute = require("./authRoute");

module.exports = function (app) {
  app.get("/api/passwords/get", passwordRoute.getPasswords);
  app.post("/api/passwords/add", passwordRoute.addPassword);
  app.put("/api/passwords/edit/:id", passwordRoute.editPassword);
  app.delete("/api/passwords/delete/:id", passwordRoute.deletePassword);
  app.post("/api/auth/register", authRoute.registerUser);
  app.post("/api/auth/login", authRoute.loginUser);
  app.get("/api/auth/logout", authRoute.logoutUser);
  app.get("/api/auth/check", authRoute.checkUser);
};
