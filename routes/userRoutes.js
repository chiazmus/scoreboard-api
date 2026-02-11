const router = require("express").Router();
const userController = require("../controllers/userController");
const { UserValidationRules, validate } = require('../utility/validator');

router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post("/", UserValidationRules(), validate, userController.createUser);

router.put("/:id", UserValidationRules(), validate, userController.updateUser);

router.delete("/:id", userController.deleteSingle);

module.exports = router;