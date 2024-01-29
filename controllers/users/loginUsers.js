import { loginUser } from "#models/users.js";

async function loginUsers(req, res, next) {
  try {
    const { token, user } = await loginUser(req.body);
    const { email, subscription } = user;
    return res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
}

export { loginUsers };
