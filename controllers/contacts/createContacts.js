import { addContact } from "#models/contacts.js";

async function createContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    console.log(req.user);
    const postContact = await addContact(req.body, owner);
    return res.status(201).json({ postContact });
  } catch (error) {
    next(error);
  }
}

export { createContacts };
