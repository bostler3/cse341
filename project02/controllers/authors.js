const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all authors from database
const getAll = async (req, res) => {
  //#swagger.tags=["Authors"]
  try {
    // testingerrorhandling();
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("authors")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

// Get a single author from database by author ID
const getSingle = async (req, res) => {
  //#swagger.tags=["Authors"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid author ID to find an author.");
  }
  const authorId = new ObjectId(req.params.id);
  try {
    // testingerrorhandling();
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("authors")
      .find({ _id: authorId })
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
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
  try {
    // testingerrorhandling();
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
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

// Modify an existing author
const modifyAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid author ID to modify an author.");
  }
  const authorId = new ObjectId(req.params.id);
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    bookIds: req.body.bookIds,
  };
  try {
    // testingerrorhandling();
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
        .json(
          response.error || "An error occurred while modifying the author.",
        );
    }
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

// Delete an existing author
const deleteAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid author ID to delete an author.");
  }
  const authorId = new ObjectId(req.params.id);
  try {
    // testingerrorhandling();
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
  } catch (error) {
    res.status(400).json({ message: "An error occurred." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  modifyAuthor,
  deleteAuthor,
};
