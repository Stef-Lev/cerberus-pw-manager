import jwt from "jsonwebtoken";

export default function authenticate(handler) {
  const secret = process.env.JWT_SECRET;
  return async (req, res) => {
    try {
      const { cerberus_token } = req.cookies;

      if (!cerberus_token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = await promisify(jwt.verify)(token, secret);
      req.user = decoded.user;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
