const router = require("express").Router();
const userController = require("../controllers/userController");
const {isAdmin} = require('../utility/authenticate.js');

router.get("/", isAdmin, userController.getAll);

router.get("/:id", isAdmin, userController.getSingle);

router.post("/", isAdmin, userController.createUser);

router.put("/:id", isAdmin, userController.updateUser);

router.delete("/:id", isAdmin, userController.deleteSingle);

module.exports = router;