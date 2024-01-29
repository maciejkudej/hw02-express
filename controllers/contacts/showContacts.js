import { getContactById } from "#models/contacts.js";

async function showContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const contactId = await getContactById(req.params.contactId, owner);
    if (!contactId) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ contactId });
  } catch (error) {
    next(error);
  }
}

export { showContacts };
