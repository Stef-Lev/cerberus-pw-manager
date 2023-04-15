import { getSession } from "next-auth/react";

export default function authenticate() {
  return async function (req, res, next) {
    const session = await getSession({ req });

    if (!session) {
      res.writeHead(302, { Location: "/auth/login" });
      res.end();
    } else {
      next();
    }
  };
}
