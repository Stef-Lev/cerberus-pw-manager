import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },

  iv: {
    type: String,
    required: true,
  },
});

const Record = models.Record || model("Record", RecordSchema);

export default Record;
