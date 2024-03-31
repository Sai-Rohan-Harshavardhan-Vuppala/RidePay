const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Trip = require("../models/tripModel");

exports.createTrip = factory.createOne(Trip);

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const allTrips = await Trip.find().populate(["route", "vehicle"]);

  console.log({ allTrips });

  res.send(allTrips);
});
