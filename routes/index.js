const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/users", require("./userRoutes"));

router.use("/scores", require("./scoreRoutes"));

router.use("/games", require("./gameRoutes"));

router.use("/achievements", require("./acheivementRoutes"));

module.exports = router;