const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  classId: { type: mongoose.ObjectId },
});

SubjectSchema.index({ name: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model("Subject", SubjectSchema);
