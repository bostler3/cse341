const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");
const validation = require("../middleware/validate");
const authorsController = require("../controllers/authors");

// Route/endpoint to get all authors from database
router.get("/", authorsController.getAll);

// Route/endpoint to get a single author from database by passing an author ID
router.get("/:id", authorsController.getSingle);

// Route/endpoint to create a new author
router.post(
  "/",
  isAuthenticated,
  validation.saveAuthor,
  authorsController.createAuthor,
);

// Route/endpoint to modify an existing author
router.put(
  "/:id",
  isAuthenticated,
  validation.saveAuthor,
  authorsController.modifyAuthor,
);

// Route/endpoint to delete an existing author
router.delete("/:id", isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
