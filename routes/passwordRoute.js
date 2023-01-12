const catchAsync = require("../utils/catchAsync");
const { recordLogo } = require("../utils/logos");
const User = require("../models/user");
const { encrypt, decrypt } = require("../encryptionHandler");

exports.getAllRecords = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  let recordsDecrypted = [];
  user.records.forEach((record) => {
    let obj = {};
    obj.id = record._id;
    obj.title = record.title;
    obj.url = record.url;
    obj.username = record.username;
    obj.logo = record.logo;
    obj.password = decrypt(record);
    recordsDecrypted.push(obj);
  });
  res.status(200).json(recordsDecrypted);
});

exports.getRecord = catchAsync(async (req, res) => {
  const { userId, recordId } = req.params;
  const user = await User.findById(userId);
  const foundRecord = user.records.find((record) => record.id === recordId);
  foundRecord.password = decrypt(foundRecord);
  foundRecord.iv = undefined;
  res.status(200).json(foundRecord);
});

exports.addRecord = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const { password, url } = req.body;
  const hashedPw = encrypt(password);
  let createdLogo = recordLogo(url);

  user.records.push({
    ...req.body,
    password: hashedPw.password,
    iv: hashedPw.iv,
    logo: createdLogo,
  });
  await user.save();
  res.status(200).json({ result: "success", message: "Record added" });
});

exports.editRecord = catchAsync(async (req, res) => {
  const { password, title, username, url } = req.body;
  const { userId, recordId } = req.params;
  const hashedPw = encrypt(password);
  const user = await User.findById(userId);

  let foundRecord = await user.records.find((rec) => rec.id == recordId);
  let createdLogo = recordLogo(url);

  foundRecord = {
    ...foundRecord,
    title,
    username,
    url,
    password: hashedPw.password,
    iv: hashedPw.iv,
    logo: createdLogo,
  };
  const filteredRecords = await user.records.filter(
    (rec) => rec.id != recordId
  );
  const updatedRecords = [...filteredRecords, foundRecord];
  user.records = updatedRecords;
  await user.save();
  res.status(200).json({
    result: "success",
    record: foundRecord,
    message: `Record ${recordId} is updated`,
  });
});

exports.deleteRecord = catchAsync(async (req, res) => {
  const { userId, recordId } = req.params;
  const user = await User.findById(userId);

  const filteredRecords = await user.records.filter(
    (rec) => rec.id != recordId
  );
  user.records = filteredRecords;
  await user.save();

  res.json({ result: "success", message: `Record ${recordId} was deleted` });
});
