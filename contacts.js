const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) => {
  const str = JSON.stringify(contacts);
  try {
    await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => String(contact.id) === String(contactId)
    );
    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found!`);
    }
    console.log(contact);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(
      (contact) => String(contact.id) === String(contactId)
    );
    if (idx === -1) {
      throw new Error(`Contact with ID ${id} not found!`);
    }
    const filteredContacts = contacts.filter((contact) => {
      return String(contact.id) !== String(contactId);
    });
    await updateContacts(filteredContacts);
    console.table(filteredContacts);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, newContact];
    updateContacts(newContacts);
    console.table(newContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
