const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["student", "admin", "faculty"],
    default: "student",
  },
  phNo: {
    type: String,
  },
  wallet: {
    points: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
