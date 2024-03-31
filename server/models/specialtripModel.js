const mongoose = require("mongoose");

const specialtripSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  startDate: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
  endDate: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
  time: { type: Date, required: [true] },
});

const Specialtrip = mongoose.model("Specialtrip", specialtripSchema);
module.exports = Specialtrip;
