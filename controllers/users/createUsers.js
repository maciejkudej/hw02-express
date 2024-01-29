import { addUser } from "#models/users.js";

async function createUsers(req, res, next) {
  try {
    const postUser = await addUser(req.body);
    return res.status(201).json({ postUser });
  } catch (error) {
    next(error);
  }
}

export { createUsers };
