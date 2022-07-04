const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: null },
  role: {
    type: String,
    enum: ["admin", "teacher", "student", "parent"],
    default: "student",
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  classId: { type: Schema.ObjectId },
  parentId: { type: Schema.ObjectId },
  verfied: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
