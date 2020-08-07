const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const contactsPath = path.join(__dirname, "db", "contacts.json");
const encoding = "utf8";

async function listContacts() {
  try {
    const listContacts = await readFileAsync(contactsPath, encoding);
    return JSON.parse(listContacts);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function getById (contactId) {
  try {
    const listContacts = await readFileAsync(contactsPath, encoding);
    const contactsList = JSON.parse(listContacts);

    let obj = contactsList.filter((contact) => {
      if (contact.id === contactId) return contact;
    });

    if (obj.length === 0) {
      return { message: "Not found" };
    }
    return obj;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function removeContact(contactId) {
  try {
    const listContacts = JSON.parse(
      await readFileAsync(contactsPath, encoding)
    );

    const isInclude = listContacts.filter((contact) => contact.id === contactId);
    if (isInclude.length === 0) {
      return { message: "Not found" };
    }

    const filtredContacts = listContacts.filter(
      (contact) => contact.id !== contactId
    );

    await writeFileAsync(contactsPath, JSON.stringify(filtredContacts));
    return { message: "contact deleted" };
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = {
      id: 0,
      name,
      email,
      phone,
    };

    const listContacts = JSON.parse(
      await readFileAsync(contactsPath, encoding)
    );
    let arr = [];

    if (listContacts) {
      arr = listContacts;
      contact["id"] = arr[arr.length - 1].id + 1;
    }
    arr.push(contact);

    await writeFileAsync(contactsPath, JSON.stringify(arr));

    return contact;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function updateContact(contactId, { name, email, phone }) {
  try {
    const listContacts = JSON.parse(
      await readFileAsync(contactsPath, encoding)
    );

    const isInclud = listContacts.filter((contact) => contact.id === contactId);
    if (isInclud.length === 0) {
      return { message: "Not found" };
    }
    let updatecContact;

    const filtredContacts = listContacts.filter((contact) => {
      if (contact.id === contactId) {
        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        updatecContact = contact;
      }
      return contact;
    });

    await writeFileAsync(contactsPath, JSON.stringify(filtredContacts));
    return updatecContact;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

module.exports = {
  listContacts,
  getById ,
  removeContact,
  addContact,
  updateContact,
};
