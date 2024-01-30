import express from "express";
import { indexContacts } from "#controllers/contacts/indexContacts.js";
import { showContacts } from "#controllers/contacts/showContacts.js";
import { deleteContacts } from "#controllers/contacts/deleteContacts.js";
import { createContacts } from "#controllers/contacts/createContacts.js";
import { updateContacts } from "#controllers/contacts/updateContacts.js";
import { updateStatusContacts } from "#controllers/contacts/updateStatusContacts.js";
import { bodyValidate } from "#middlewares/validate.js";
import { authenticate } from "#middlewares/authenticate.js";
import { addDataSchema, updateDataSchema } from "#validators/validation.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", indexContacts);

contactsRouter.get("/:contactId", showContacts);

contactsRouter.post("/", bodyValidate(addDataSchema), createContacts);

contactsRouter.delete("/:contactId", deleteContacts);

contactsRouter.put(
  "/:contactId",
  bodyValidate(updateDataSchema),
  updateContacts
);
contactsRouter.patch(
  "/:contactId/favorite",
  bodyValidate(addDataSchema),
  updateStatusContacts
);
export { contactsRouter };
