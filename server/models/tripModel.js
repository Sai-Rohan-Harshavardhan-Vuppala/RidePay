const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  startDate: { type: Date },
  endDate: { type: Date },
  time: { type: Date, required: [true] },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
