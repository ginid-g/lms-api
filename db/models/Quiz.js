const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  correctOption: { type: String, enum: ["a", "b", "c", "d"], required: true },
  a: { type: String, required: true },
  b: { type: String, required: true },
  c: { type: String, required: true },
  d: { type: String, required: true },
});

const QuizSchema = new Schema({
  title: { type: String, required: true },
  classId: { type: mongoose.ObjectId, required: true },
  subjectId: { type: mongoose.ObjectId, required: true },
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Quiz", QuizSchema);
