const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all books from database
const getAll = async (req, res) => {
  //#swagger.tags=["Books"]
  const result = await mongodb.getDatabase().db().collection("books").find();
  result.toArray().then((books) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  });
};

// Get a single book from database by ISBN (book ID)
const getSingle = async (req, res) => {
  //#swagger.tags=["Books"]
  const bookId = req.params.id;
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .find({ _id: bookId });
  result.toArray().then((books) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books[0]);
  });
};

// Create a new book
const createBook = async (req, res) => {
  //#swagger.tags=["Books"]
  const book = {
    _id: req.body.id,
    format: req.body.format, // hardback or paperback
    bookTitle: req.body.bookTitle,
    yearPublished: req.body.yearPublished,
    publisherName: req.body.publisherName,
    numPages: req.body.numPages,
    genre: req.body.genre, // e.g. fiction, non-fiction, children's literature, etc.
    subject: req.body.subject, // science, history, etc.
    authorId: req.body.authorId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .insertOne(book);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the book.");
  }
};

// Modify an existing book
const modifyBook = async (req, res) => {
  //#swagger.tags=["Books"]
  const bookId = req.params.id;
  const book = {
    format: req.body.format, // hardback or paperback
    bookTitle: req.body.bookTitle,
    yearPublished: req.body.yearPublished,
    publisherName: req.body.publisherName,
    numPages: req.body.numPages,
    genre: req.body.genre, // e.g. fiction, non-fiction, children's literature, etc.
    subject: req.body.subject, // science, history, etc.
    authorId: req.body.authorId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .replaceOne({ _id: bookId }, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while modifying the book.");
  }
};

// Delete an existing book
const deleteBook = async (req, res) => {
  //#swagger.tags=["Books"]
  const bookId = req.params.id;
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .deleteOne({ _id: bookId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the book.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  modifyBook,
  deleteBook,
};
