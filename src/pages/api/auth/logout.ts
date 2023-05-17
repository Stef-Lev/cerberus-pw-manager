export default async function handler(req, res) {
  try {
    res.cookie("cerberus_token", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ message: "User is logged out" });
  } catch (err) {
    res.status(400).json({ message: "Error while logging out" });
  }
}
