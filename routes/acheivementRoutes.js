const router = require("express").Router();
const acheivementController = require("../controllers/acheivementController");
const { AcheivementValidationRules, validate } = require('../utility/validator');
const {isAuthenticated} = require('../utility/authenticate.js');

router.get("/all/:id", acheivementController.getAll);

router.get("/single/:id", acheivementController.getSingle);

router.post("/", isAuthenticated, AcheivementValidationRules(), validate, acheivementController.createAcheivement);

router.put("/:id", isAuthenticated, AcheivementValidationRules(), validate, acheivementController.updateAcheivement);

router.delete("/:id", isAuthenticated, acheivementController.deleteSingle);

module.exports = router;