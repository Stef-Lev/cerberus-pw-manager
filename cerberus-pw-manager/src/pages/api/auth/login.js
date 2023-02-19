import connectDB from "@/connectDB";
import User from "@/models/user";
import { createUserToken } from "@/helpers/token";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ msg: "Please provide a username and password!" });
    }

    const user = await User.findOne({ username }).select("+password");
    let correctPassword;
    if (user) {
      correctPassword = await user.correctPassword(password, user.password);
    }
    if (!user || !correctPassword) {
      return res.status(401).send({ msg: "Incorrect username or password" });
    }
    createUserToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
}
