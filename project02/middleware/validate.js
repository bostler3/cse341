const validator = require("../helpers/validate");

const saveAuthor = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    birthdate: "required|string",
    booksIds: "array", // source: https://github.com/mikeerickson/validatorjs
    "booksIds.*": "string", // Got help on this from a Bing search for "How can I create a validation rule in validatorjs for an array of strings?"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveBook = (req, res, next) => {
  const validationRule = {
    id: "required|string",
    format: "required|string",
    bookTitle: "required|string",
    yearPublished: "required|numeric|min:1", // source: https://github.com/mikeerickson/validatorjs and Bing search for "example of required numeric min:1 in validatorjs"
    publisherName: "required|string",
    numPages: "required|numeric|min:1",
    genre: "required|string",
    subject: "required|string",
    publisherName: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const modifyBook = (req, res, next) => {
  const validationRule = {
    format: "required|string",
    bookTitle: "required|string",
    yearPublished: "required|numeric|min:1", // source: https://github.com/mikeerickson/validatorjs and Bing search for "example of required numeric min:1 in validatorjs"
    publisherName: "required|string",
    numPages: "required|numeric|min:1",
    genre: "required|string",
    subject: "required|string",
    publisherName: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = { saveAuthor, saveBook, modifyBook };
