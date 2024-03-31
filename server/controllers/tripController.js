const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Trip = require("../models/tripModel");

exports.createTrip = factory.createOne(Trip);

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const allTrips = await Trip.find().populate(["route", "vehicle"]);

  console.log({ allTrips });

  res.send(allTrips);
});

exports.createTripsFromSchedule = catchAsync(async (req, res, next) => {
  const { startDate, schedule } = req.body;

  await Trip.updateMany({ active: true }, { $set: { active: false } });

  await Promise.all(
    schedule.map(async (trip) => {
      const newTrip = await Trip.create({
        route: trip.route,
        vehicle: trip.vehicle,
        startDate: new Date(startDate),
        time: trip.time,
      });
    })
  );

  res.send("Successfully created!");
});
