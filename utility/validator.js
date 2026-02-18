const { body, validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const ScoreValidationRules = () => {
  return [
    body("gameId")
      .isAlphanumeric()
      .withMessage("Make sure to put in an existing Game ID plz"),
    // makes sure the score is numeric.
    body("score").isNumeric(),
  ];
};

const GameValidationRules = () => {
  return [
    body("userId")
      .isAlphanumeric()
      .withMessage("Make sure to put in an existing User ID plz"),
    body("gameName").isLength({ min: 5}).withMessage("The gameName must have at least 5 characters"),
  ];
};

const AcheivementValidationRules = () => {
  return [
    body("gameId")
      .isAlphanumeric()
      .withMessage("Make sure to put in an existing Game ID plz"),
    body("name").isLength({ min: 5}).withMessage("The name must have at least 5 characters"),
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
  GameValidationRules,
  AcheivementValidationRules,
  validate,
};
