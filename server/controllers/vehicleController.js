const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const Vehicle = require("../models/vehicleModel");

exports.createVehicle = factory.createOne(Vehicle);
exports.getAllVehicles = factory.getAll(Vehicle);
