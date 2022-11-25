const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  url: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  iv: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Record", RecordSchema);
