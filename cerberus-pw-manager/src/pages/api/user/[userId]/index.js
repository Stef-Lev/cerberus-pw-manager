import connectDB from "@/connectDB";
import User from "@/models/user";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { userId } = req.query;
    const user = await User.findById(userId);
    console.log(req.body);
    // await user.save();

    res.json({ result: "success", message: `User ${userId} profile changed` });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
