import { logoutUser } from "#models/users.js";

async function logoutUsers(req, res, next) {
  try {
    const { _id } = req.user;
    await logoutUser(_id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export { logoutUsers };
