const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  amount: {
    type: Number,
    require: [true, "Amount is must on a transaction!"],
  },
  status: {
    type: Boolean,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
