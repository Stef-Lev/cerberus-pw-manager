import connectDB from "@/connectDB";
import { decrypt } from "@/helpers/encryptionHandler";
import User from "@/models/user";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log(req.method);
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
