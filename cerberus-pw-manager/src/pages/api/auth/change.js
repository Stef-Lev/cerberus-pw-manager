import { getSession } from "next-auth/react";
import connectDB from "@/connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { oldPassword, newPassword } = req.body;

  try {
    await connectDB();
    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await connectDB().closeConnection();
  }
}
