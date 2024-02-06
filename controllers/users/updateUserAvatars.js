import { updateAvatar } from "#models/users.js";

async function updateUserAvatars(req, res, next) {
  try {
    const { _id } = req.user;
    const avatarAddress = await updateAvatar(req.file, _id);
    res.status(200).json({ avatarURL: avatarAddress });
  } catch (error) {
    next(error);
  }
}

export { updateUserAvatars };
