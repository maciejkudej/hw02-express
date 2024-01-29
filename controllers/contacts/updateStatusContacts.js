import { updateStatusContact } from "#models/contacts.js";

async function updateStatusContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const contactId = req.params.contactId;
    const patchContact = await updateStatusContact(contactId, req.body, owner);

    if (!patchContact) {
      return res.status(404).json({ message: "missing field favorite" });
    }

    return res.status(200).json({ patchContact });
  } catch (error) {
    next(error);
  }
}

export { updateStatusContacts };
