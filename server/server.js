require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { encrypt, decrypt } = require("./encryptionHandler");
const Record = require("./models/record");
const User = require("./models/user");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyJWT = require("./utils/verifyJWT");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Register
app.post(
  "/api/register",
  catchAsync(async (req, res, next) => {
    const user = req.body;
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
      res.json({ message: "Username or email already exists." });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
      });
      await dbUser.save();
      res.status(200).json({ message: "success" });
    }
  })
);

//Login
app.post(
  "/api/login",
  catchAsync(async (req, res, next) => {
    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
      if (!dbUser) {
        return res.json({ message: "Invalid Username or Password" });
      }
      bcrypt
        .compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
              username: dbUser.username,
            };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 })(
              (err, token) => {
                if (err) return res.json({ message: err });
                return res.json({
                  message: "success",
                  token: `Bearer ${token}`,
                });
              }
            );
          } else {
            return res.json({
              message: "Invalid Username or Password",
            });
          }
        });
    });
  })
);

// //Access current user
app.get(
  "/api/getusername",
  verifyJWT,
  catchAsync(async (req, res, next) => {
    res.json({ isLoggedIn: true, username: req.user.username });
  })
);

// Get all
app.get(
  "/api/passwords/get",
  catchAsync(async (req, res, next) => {
    const records = await Record.find({});
    let recordsDecrypted = [];
    await records.map((item) => {
      let obj = {};
      obj.id = item._id;
      obj.title = item.title;
      obj.url = item.url;
      obj.username = item.username;
      obj.password = decrypt({ password: item.password, iv: item.iv });
      recordsDecrypted.push(obj);
    });
    res.json(recordsDecrypted);
  })
);

// Post one
app.post(
  "/api/passwords/add",
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
    res.status(200).json({ result: "success", message: "Record added" });
  })
);

app.put(
  "/api/passwords/edit/:id",
  catchAsync(async (req, res) => {
    const { password, title, username, url } = req.body;
    const hashedPw = encrypt(password);
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { username, password: hashedPw.password, title, url, iv: hashedPw.iv },
      { new: true, useFindAndModify: false }
    );
    res.json({ result: "success", message: "Record updated", record });
  })
);

app.delete(
  "/api/passwords/delete/:id",
  catchAsync(async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ result: "success", message: "Record deleted" });
  })
);

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

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
