import connectDB from "@/connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { userId } = req.query;
  const { oldPassword, newPassword } = req.body;

  try {
    await connectDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    (await connectDB()).closeConnection();
  }
}
