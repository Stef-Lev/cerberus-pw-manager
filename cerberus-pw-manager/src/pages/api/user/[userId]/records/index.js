import connectDB from "@/connectDB";
import User from "@/models/user";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { userId } = req.query;

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
    // res.status(200).json({ msg: "it works" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
