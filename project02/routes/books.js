const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

// Route/endpoint to get all books from database
router.get("/", booksController.getAll);

// Route/endpoint to get a single book from database by passing an ISBN (i.e. book ID)
router.get("/:id", booksController.getSingle);

// Route/endpoint to create a new book
router.post("/", booksController.createBook);

// Route/endpoint to modify an existing book
router.put("/:id", booksController.modifyBook);

// Route/endpoint to delete an existing book
router.delete("/:id", booksController.deleteBook);

module.exports = router;