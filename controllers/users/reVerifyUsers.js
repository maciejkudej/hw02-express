import { reVerifyUser } from "#models/users.js";

async function reVerifyUsers(req, res, next) {
  try {
    const { email } = req.body;
    await reVerifyUser(email);
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}

export { reVerifyUsers };
