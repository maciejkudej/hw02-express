import { verifyUser } from "#models/users.js";

async function verifyUsers(req, res, next) {
  try {
    const { verificationToken } = req.params;
    await verifyUser(verificationToken);
    return res.status(200).json({ message: "Verification successfull" });
  } catch (error) {
    next(error);
  }
}

export { verifyUsers };
