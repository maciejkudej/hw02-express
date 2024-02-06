import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import sha256 from "sha256";
import sgMail from "@sendgrid/mail";
import "dotenv/config.js";
sgMail.setApiKey(process.env.API_TOKEN);
import { User } from "./userModel.js";
import {
  RegistrationConflictError,
  UnauthorizedError,
  NotFound,
  AuthorizationError,
} from "#helpers/errors.js";

const addUser = async (body) => {
  const { email, password, subscription } = body;
  const emailUsers = await User.findOne({ email });
  if (emailUsers !== null) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  } else {
    const avatar = gravatar.url(email, { protocol: "http" });
    const code = sha256(email + process.env.JWT_SECRET);
    const user = new User({
      email,
      password,
      subscription,
      avatarURL: avatar,
      verificationToken: code,
    });
    const msg = {
      to: email,
      from: "maciej.kudej@gmail.com",
      subject: "Please, confirm your email",
      text: `Please, confirm your email address POST http://localhost:8088/api/users/verify/${code} `,
      html: `Please, confirm your email address POST http://localhost:8088/api/users/verify/${code} `,
    };
    await sgMail.send(msg);
    return user.save();
  }
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({
    verificationToken,
    verify: false,
  });
  if (!user) {
    throw new NotFound(`User not found`);
  }
  user.verify = true;
  user.verificationToken = "null";
  await user.save();

  const msg = {
    to: user.email,
    from: "maciej.kudej@gmail.com",
    subject: "Thank you, for registration!",
    text: `Verification successful `,
    html: `Verification successful `,
  };
  await sgMail.send(msg);
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user.verify === false) {
    throw new AuthorizationError(`Not authorized`);
  }
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

const updateAvatar = async (file, userId) => {
  const { filename } = file;

  const tmpPath = path.resolve(process.cwd(), "tmp", filename);
  const publicPath = path.resolve(process.cwd(), "public/avatars", filename);

  const image = await Jimp.read(tmpPath);
  image.resize(250, 250);
  image.write(path.resolve(process.cwd(), "tmp", filename));

  await fs.rename(tmpPath, publicPath);
  await User.findByIdAndUpdate(userId, { avatarURL: publicPath });
  return publicPath;
};

const getCurrentUser = async ({ email }) => {
  const subscription = await User.find({ email });
  const user = new User({ email, subscription });
  return user;
};

const reVerifyUser = async (email) => {
  const user = await User.findOne({ email });
  if (user === null) {
    throw new AuthorizationError(`Missing required field email`);
  }
  if (user.verify === true) {
    throw new AuthorizationError(`Verification has already been passed`);
  }
  const code = sha256(email + process.env.JWT_SECRET);

  const msg = {
    to: email,
    from: "maciej.kudej@gmail.com",
    subject: "Please, confirm your email",
    text: `Please, confirm your email address POST http://localhost:8088/api/users/verify/${code} `,
    html: `Please, confirm your email address POST http://localhost:8088/api/users/verify/${code} `,
  };
  await sgMail.send(msg);
};

export {
  addUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  verifyUser,
  reVerifyUser,
};
