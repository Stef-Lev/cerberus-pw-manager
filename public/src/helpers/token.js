import jwt from "jsonwebtoken";
import Cookies from "cookies";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createUserToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);

  let d = new Date();
  d.setDate(d.getDate() + 30);

  const cookies = new Cookies(req, res);
  cookies.set("cerberus_token", token, {
    expires: d,
    httpOnly: true,
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
