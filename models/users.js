import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import { User } from "./userModel.js";
import {
  RegistrationConflictError,
  UnauthorizedError,
} from "#helpers/errors.js";

const addUser = async (body) => {
  const { email, password, subscription } = body;
  const emailUsers = await User.findOne({ email });

  if (emailUsers !== null) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  } else {
    const user = new User({ email, password, subscription });
    return user.save();
  }
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError(`Email or password is wrong`);
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(user._id, { token });
  return { token, user };
};

const logoutUser = async (userId) => {
  const userToken = await User.findByIdAndUpdate(userId, { token: null });
  return userToken;
};

const getCurrentUser = async ({ email }) => {
  const subscription = await User.find({ email });
  const user = new User({ email, subscription });
  return user;
};

export { addUser, loginUser, logoutUser, getCurrentUser };
