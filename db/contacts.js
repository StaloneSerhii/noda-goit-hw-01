const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contact.json");

const listContacts = async () => {
  const contact = await fs.readFile(contactsPath);
  return JSON.parse(contact);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const getContact = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  getContact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
