import connectDB from "@/connectDB";
import User from "@/models/user";
import { createUserToken } from "@/helpers/token";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  await connectDB();

  const { username, password, passwordCheck, fullname } = req.body;
  if (!username || !password || !passwordCheck) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  if (password !== passwordCheck) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const newUser = new User({
    username: username,
    password: password,
    fullname: fullname || username,
  });

  try {
    await newUser.save();
    createUserToken(newUser, 201, req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user." });
  }
}
