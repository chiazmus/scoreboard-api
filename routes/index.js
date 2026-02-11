const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/users", require("./userRoutes"));

router.use("/scores", require("./scoreRoutes"));

module.exports = router;