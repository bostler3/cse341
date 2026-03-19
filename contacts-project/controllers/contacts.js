const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all contacts from database
const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

// Get a single contact from database by contact ID
const getSingle = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact ID to find a contact.");
  }
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId });
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

// Create a new contact
const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the contact.");
  }
};

// Modify an existing contact
const modifyContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact ID to modify a contact.");
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while modifying the contact.");
  }
};

// Delete an existing contact
const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact ID to delete a contact.");
  }
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the contact.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  modifyContact,
  deleteContact,
};
