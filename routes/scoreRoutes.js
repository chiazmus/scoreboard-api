const router = require("express").Router();
const { ScoreValidationRules, validate } = require('../utility/validator');
const scoreController = require("../controllers/scoreController");

router.get("/", scoreController.getAll);

router.get("/:id", scoreController.getByUser);

router.get("/single/:id", scoreController.getSingle);

router.post("/", ScoreValidationRules(), validate, scoreController.createScore);

router.put("/:id", ScoreValidationRules(), validate, scoreController.updateScore);

router.delete("/:id", scoreController.deleteSingle);

module.exports = router;