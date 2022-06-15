const catchAsync = require("../utils/catchAsync");
const Record = require("../models/record");
const { encrypt, decrypt } = require("../encryptionHandler");

exports.getPasswords = catchAsync(async (req, res) => {
  const records = await Record.find({});
  let recordsDecrypted = [];
  records.forEach((item) => {
    let obj = {};
    obj.id = item._id;
    obj.title = item.title;
    obj.url = item.url;
    obj.username = item.username;
    obj.password = decrypt(item);
    recordsDecrypted.push(obj);
  });
  res.json(recordsDecrypted);
});

exports.addPassword = catchAsync(async (req, res) => {
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
  res.json({ result: "success", message: "Record added" });
});

exports.editPassword = catchAsync(async (req, res) => {
  const { password, title, username, url } = req.body;
  const hashedPw = encrypt(password);
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    { username, password: hashedPw.password, title, url, iv: hashedPw.iv },
    { new: true, useFindAndModify: false }
  );
  res.json({ result: "success", message: "Record updated", record });
});

exports.deletePassword = catchAsync(async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ result: "success", message: "Record deleted" });
});
