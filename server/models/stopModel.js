const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name of the stop"],
  },
  imageUrl: {
    type: String,
  },
  latitude: {
    type: String,
    required: [true, "Provide latitude of the location"],
  },
  longitude: {
    type: String,
    required: [true, "Provide longitude of the location"],
  },
});

const Stop = mongoose.model("Stop", stopSchema);
module.exports = Stop;
