import { getCurrentUser } from "#models/users.js";

async function getCurrenctUsers(req, res, next) {
  try {
    const { email, subscription } = await getCurrentUser(req.user);
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
}

export { getCurrenctUsers };
