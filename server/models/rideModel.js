const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startStop: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
  destStop: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
  status: { type: String, enum: ["Pending", "Completed"] },
  transID: {
    type: String,
    required: [true, "Provide the transaction id of the payment"],
  },
});
const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
