const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all authors from database
const getAll = async (req, res) => {
  //#swagger.tags=["Authors"]
  const result = await mongodb.getDatabase().db().collection("authors").find();
  result.toArray().then((authors) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors);
  });
};

// Get a single author from database by author ID
const getSingle = async (req, res) => {
  //#swagger.tags=["Authors"]
  const authorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .find({ _id: authorId });
  result.toArray().then((authors) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors[0]);
  });
};

// Create a new author
const createAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    bookIds: req.body.bookIds,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .insertOne(author);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the author.");
  }
};

// Modify an existing author
const modifyAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  const authorId = new ObjectId(req.params.id);
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    bookIds: req.body.bookIds,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .replaceOne({ _id: authorId }, author);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while modifying the author.");
  }
};

// Delete an existing author
const deleteAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  const authorId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("authors")
    .deleteOne({ _id: authorId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the author.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  modifyAuthor,
  deleteAuthor,
};
