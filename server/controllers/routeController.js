const factory = require("./handlerFactory");
const Route = require("../models/routeModel");
const catchAsync = require("../utils/catchAsync");

exports.createRoute = factory.createOne(Route);

exports.getAllRoutes = catchAsync(async (req, res, next) => {
  const allRoutes = await Route.find().populate({ path: "stops.stop", model: "Stop" });

  console.log({ allRoutes });

  res.send(allRoutes);
});
