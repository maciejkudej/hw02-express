import express from "express";
import { createUsers } from "#controllers/users/createUsers.js";
import { loginUsers } from "#controllers/users/loginUsers.js";
import { logoutUsers } from "#controllers/users/logoutUsers.js";
import { getCurrenctUsers } from "#controllers/users/getCurrentUsers.js";
import { updateUserAvatars } from "#controllers/users/updateUserAvatars.js";
import { verifyUsers } from "#controllers/users/verifyUsers.js";
import { reVerifyUsers } from "#controllers/users/reVerifyUsers.js";
import { authenticate } from "#middlewares/authenticate.js";
import { bodyValidate } from "#middlewares/validate.js";
import { addUserSchema } from "#validators/validation.js";
import { upload } from "#middlewares/avatarMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/signup", bodyValidate(addUserSchema), createUsers);

usersRouter.post("/login", bodyValidate(addUserSchema), loginUsers);

usersRouter.use(authenticate);

usersRouter.get("/logout", logoutUsers);

usersRouter.get("/current", getCurrenctUsers);

usersRouter.patch("/avatars", upload.single("avatar"), updateUserAvatars);

usersRouter.post("/verify/:verificationToken", verifyUsers);

usersRouter.post("/verify", reVerifyUsers);

export { usersRouter };
