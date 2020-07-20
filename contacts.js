const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const encoding = "utf8";

function listContacts() {
  fs.readFile(contactsPath, encoding, (err, contacts) => {
    if (err) throw new Error(err);
    console.table(JSON.parse(contacts));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, encoding, (err, contacts) => {
    if (err) throw new Error(err);
    const listContacts = JSON.parse(contacts);
    const getContactById = listContacts.find((contact) => {
      if (contact.length === 0) {
        console.log("ID not found");
        return;
      }
      return contact.id === contactId;
    });
    console.table(getContactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, encoding, (err, contacts) => {
    if (err) throw new Error(err);
    const listContacts = JSON.parse(contacts);
    const filterContact = listContacts.filter((contact) => {
      return contact.id !== contactId;
    });
    fs.writeFile(contactsPath, JSON.stringify(filterContact), (err) => {
      if (err) throw new Error(err);
      console.log("Contact was remove");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, encoding, (err, contacts) => {
    if (err) throw new Error(err);
    const listContacts = JSON.parse(contacts);
    const contact = {
      id: listContacts.id++,
      name,
      email,
      phone,
    };
    listContacts.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(listContacts), (err) => {
      if (err) throw new Error(err);
      console.log("You are added new contact");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
