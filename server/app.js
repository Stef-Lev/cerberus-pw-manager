require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const catchAsync = require("./utils/catchAsync");
const { encrypt, decrypt } = require("./encryptionHandler");
const Record = require("./models/record");
const PORT = 3030;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/passwords/get",
  catchAsync(async (req, res, next) => {
    const records = await Record.find({});
    res.json(records);
  })
);

app.post(
  "/passwords/add",
  catchAsync(async (req, res) => {
    const { password, title, username, url } = req.body;
    const hashedPw = encrypt(password);
    const record = new Record({
      username,
      password: hashedPw.password,
      title,
      url,
      iv: hashedPw.iv,
    });
    await record.save();
    res.status(200).json(record);
  })
);

app.get(
  "/passwords/get",
  catchAsync(async (req, res) => {
    const { password, title, username, url } = req.body;
    const hashedPw = encrypt(password);
    const record = new Record({
      username,
      password: hashedPw.password,
      title,
      url,
      iv: hashedPw.iv,
    });
    await record.save();
    res.status(200).json(record);
  })
);

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});