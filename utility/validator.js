const { body, validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const ScoreValidationRules = () => {
  return [
    // make sure the category is actually a valid mongoId
    body("userId")
      .isMongoId()
      .withMessage("Make sure to put in an existing Category ID plz"),
    // makes sure the score is numeric.
    body("score").isNumeric(),
  ];
};

const UserValidationRules = () => {
  return [
    // makes sure the password is at least 8 characters long.
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  ScoreValidationRules,
  UserValidationRules,
  validate,
};
