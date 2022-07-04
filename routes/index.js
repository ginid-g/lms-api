var express = require("express");
var router = express.Router();

router.use("/users", require("./users/users.controller"));

module.exports = router;
