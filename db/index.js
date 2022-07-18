const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

mongoose.Promise = global.Promise;

module.exports = {
  Users: require("./models/User"),
  Classes: require("./models/Class"),
  Subjects: require("./models/Subject"),
  Quizzes: require("./models/Quiz"),
};
