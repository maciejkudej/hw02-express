import express from "express";
import logger from "morgan";
import cors from "cors";

import { contactsRouter } from "./routes/api/contacts.js";
import { usersRouter } from "./routes/api/users.js";
import { errorHandler } from "./helpers/errorHandler.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use(express.static("public"));

app.use(errorHandler);
app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

export { app };
