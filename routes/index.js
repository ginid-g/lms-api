var express = require("express");
var router = express.Router();

router.use("/users", require("./users/users.controller"));

router.use("/classes", require("./classes/classes.controller"));

router.use("/subjects", require("./subjects/subjects.controller"));

module.exports = router;
