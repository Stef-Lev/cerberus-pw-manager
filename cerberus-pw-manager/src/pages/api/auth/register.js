import connectDB from "@/connectDB";
import User from "@/models/user";
import { createUserToken } from "@/helpers/token";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    let { username, password, passwordCheck, fullname } = req.body;
    if (!username || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    if (!fullname) fullname = username;

    const newUser = await User.create({
      fullname: fullname,
      username: username,
      password: password,
      passwordCheck: passwordCheck,
    });
    createUserToken(newUser, 201, req, res);
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
}
