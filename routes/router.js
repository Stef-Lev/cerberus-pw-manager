const passwordRoute = require("./passwordRoute");

module.exports = function (app) {
  app.get("/api/passwords/get", passwordRoute.getPasswords);
  app.post("/api/passwords/add", passwordRoute.addPassword);
  app.put("/api/passwords/edit/:id", passwordRoute.editPassword);
  app.delete("/api/passwords/delete/:id", passwordRoute.deletePassword);
};
