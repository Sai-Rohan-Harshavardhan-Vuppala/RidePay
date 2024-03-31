const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  vehicleId: {
    type: String,
    required: [true, "Provide vehicle ID"],
  },
  vehicleNumber: {
    type: String,
    required: [true, "Provide vehicle number"],
    unique: true,
  },
  type: {
    type: String,
    enums: ["BOV", "Bus", "Traveller"],
    required: [true, "Provide the type of transport"],
  },
  model: {
    type: String,
  },
  status: {
    type: String,
    enums: ["active", "inactive"],
    default: "active",
  },
  seats: {
    type: Number,
    required: [true, "Provide the number of seats"],
  },
  driverNumber: {
    type: String,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
