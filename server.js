require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const database = findDatabase(process.env.NODE_ENV);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwtSecret = process.env.JWT_SECRET;

mongoose.set("strictQuery", false);

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
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json(), urlEncodedParser);
app.use(cookieParser(jwtSecret));

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
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
