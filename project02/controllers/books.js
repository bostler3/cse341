const mongodb = require("../data/database");

// Get all books from database
const getAll = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    // testingerrohandling();
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

// Get a single book from database by ISBN (book ID)
const getSingle = async (req, res) => {
  //#swagger.tags=["Books"]
  const bookId = req.params.id;
  try {
    // testingerrohandling();
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .find({ _id: bookId })
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
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
  try {
    // testingerrohandling();
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
  } catch (error) {
    if (error.code === 11000) {
      // Because ISBN is being used as primary key instead of Mongo's auto-generated primary key, then must check the database to see if the ISBn already exists.  Source:  https://www.geeksforgeeks.org/node-js/how-to-handle-errors-in-mongodb-operations-using-nodejs/
      res
        .status(400)
        .json(
          "That ISBN already exists. Cannot have duplicate ISBNs. Please use a unique ISBN.",
        );
    } else {
      res.status(400).json({ message: "An error occurred." });
    }
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
  try {
    // testingerrohandling();
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
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

// Delete an existing book
const deleteBook = async (req, res) => {
  //#swagger.tags=["Books"]
  const bookId = req.params.id;
  try {
    // testingerrohandling();
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
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  modifyBook,
  deleteBook,
};
