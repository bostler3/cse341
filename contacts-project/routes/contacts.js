const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// Route/endpoint to get all contacts from database
router.get("/", contactsController.getAll);

// Route/endpoint to get a single contact from database by passing a contact ID
router.get("/:id", contactsController.getSingle);

// Route/endpoint to create a new contact
router.post("/", contactsController.createContact);

// Route/endpoint to modify an existing contact
router.put("/:id", contactsController.modifyContact);

// Route/endpoint to delete an existing contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;