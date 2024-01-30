import { listContacts } from "#models/contacts.js";

async function indexContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const contactList = await listContacts(owner);
    return res.status(200).json({ contactList });
  } catch (error) {
    next(error);
  }
}

export { indexContacts };
