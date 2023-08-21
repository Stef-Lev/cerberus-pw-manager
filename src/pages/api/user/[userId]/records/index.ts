import connectDB from "@/connectDB";
import { decrypt, encrypt } from "@/helpers/encryptionHandler";
import { recordLogo } from "@/helpers/logos";
import User from "@/models/user";
import { IRecord } from "@/types/schemas";

export default async function handler(req, res) {
  try {
    await connectDB();
    if (req.method === "GET") {
      const { userId } = req.query;
      const user = await User.findById(userId);
      const recordsDecrypted = [];
      user.records.forEach((record) => {
        const obj = {} as IRecord;
        obj.id = record._id;
        obj.title = record.title;
        obj.url = record.url;
        obj.username = record.username;
        obj.logo = record.logo;
        obj.password = decrypt(record);
        recordsDecrypted.push(obj);
      });
      res.status(200).json(recordsDecrypted);
    }
    if (req.method === "POST") {
      const { userId } = req.query;
      const user = await User.findById(userId);
      const { password, url, title } = req.body;
      const hashedPw = encrypt(password);
      const createdLogo = recordLogo(url, title);

      user.records.push({
        ...req.body,
        password: hashedPw.password,
        iv: hashedPw.iv,
        logo: createdLogo,
      });
      await user.save();
      res.status(200).json({ result: "success", message: "Record added" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
