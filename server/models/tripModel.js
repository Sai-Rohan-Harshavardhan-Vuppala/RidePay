const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  startDate: { type: Date, required: [true, "startDate is required"] },
  endDate: { type: Date },
  time: { type: String, required: [true, "time is required"] },
  active: { type: Boolean, default: true },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
