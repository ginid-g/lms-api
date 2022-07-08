var express = require("express");
var router = express.Router();

router.use("/users", require("./users/users.controller"));

router.use("/classes", require("./classes/classes.controller"));

module.exports = router;
