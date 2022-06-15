require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const database = findDatabase(process.env.NODE_ENV);

mongoose.connect(database);

function findDatabase(env) {
  switch (env) {
    case "production":
      return process.env.MONGODB_PROD_URI;
    case "development":
      return process.env.MONGODB_DEV_URI;
    default:
      return process.env.MONGODB_DEV_URI;
  }
}

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  switch (err.name) {
    case "CastError":
      res
        .status(500)
        .json(new ExpressError(undefined, err.name, "ID is not valid", 500));
      break;
    case "ValidationError":
      res
        .status(400)
        .json(new ExpressError(undefined, err.name, err.message, 403));
      break;
    default:
      res.status(500).json(new ExpressError(err.name, "Something went wrong"));
  }
});

require("./routes/router")(app);

if (process.env.NODE_ENV === "production") {
  const root = require("path").resolve(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
