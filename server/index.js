require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./encryptionHandler");
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: 3306,
  password: process.env.MYSQL_PW,
  database: "pwmanager",
  insecureAuth: true,
});

app.get("/", (req, res) => {
  res.json(`Hello world`);
});

app.post("/addpassword", (req, res) => {
  const { password, service } = req.body;
  const hashedPw = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, service, iv) VALUES (?,?,?)",
    [hashedPw.password, service, hashedPw.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(`SUCCESS: ${result}`);
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.json(decrypt(req.body));
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
