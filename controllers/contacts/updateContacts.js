import { updateContact } from "#models/contacts.js";

async function updateContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const contactId = req.params.contactId;
    const changes = await updateContact(contactId, req.body, owner);
    return res.status(200).json({ changes });
  } catch (error) {
    next(error);
  }
}

export { updateContacts };
