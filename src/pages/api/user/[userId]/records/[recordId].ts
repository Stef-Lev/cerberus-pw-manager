import connectDB from "@/connectDB";
import { decrypt, encrypt } from "@/helpers/encryptionHandler";
import User from "@/models/user";
import { IRecord } from "@/types/schemas";
import { makeRecordLogo } from "@/helpers/logos";

export default async function handler(req, res) {
  try {
    await connectDB();
    if (req.method === "GET") {
      const { userId, recordId } = req.query;
      const user = await User.findById(userId);
      const foundRecord = user.records.find((record) => record.id === recordId);
      foundRecord.password = decrypt(foundRecord);
      foundRecord.iv = undefined;
      res.status(200).json(foundRecord);
    }
    if (req.method === "PUT") {
      const { password, title, username, url } = req.body;
      const { userId, recordId } = req.query;
      const hashedPw = encrypt(password);
      const user = await User.findById(userId);

      const foundRecord = await user.records.find((rec) => rec.id == recordId);
      const updatedRecord = {} as IRecord;

      updatedRecord.title = title;
      updatedRecord.url = url;
      updatedRecord.username = username;
      updatedRecord.password = hashedPw.password;
      updatedRecord.logo = await makeRecordLogo(url, title);
      updatedRecord.iv = hashedPw.iv;
      updatedRecord._id = foundRecord._id;

      const filteredRecords = await user.records.filter(
        (rec) => rec.id != recordId
      );
      const updatedRecords = [...filteredRecords, updatedRecord];
      user.records = updatedRecords;
      await user.save();
      res.status(200).json({
        result: "success",
        record: updatedRecord,
        message: `Record ${recordId} is updated`,
      });
    }
    if (req.method === "DELETE") {
      const { userId, recordId } = req.query;
      const user = await User.findById(userId);

      const filteredRecords = await user.records.filter(
        (rec) => rec.id != recordId
      );
      user.records = filteredRecords;
      await user.save();

      res.json({
        result: "success",
        message: `Record ${recordId} was deleted`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
