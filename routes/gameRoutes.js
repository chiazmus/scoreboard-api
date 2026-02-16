const router = require("express").Router();
const gameController = require("../controllers/gameController");
const { GameValidationRules, validate } = require('../utility/validator');
const {isAuthenticated} = require('../utility/authenticate.js');

router.get("/", isAuthenticated, gameController.getAll);

router.get("/:id", isAuthenticated, gameController.getSingle);

router.post("/", isAuthenticated, GameValidationRules(), validate, gameController.createGame);

router.put("/:id", isAuthenticated, GameValidationRules(), validate, gameController.updateGame);

router.delete("/:id", isAuthenticated, gameController.deleteSingle);

module.exports = router;