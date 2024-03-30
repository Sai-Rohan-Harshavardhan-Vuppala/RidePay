const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const Vehicle = require("../models/vehicleModel");

exports.createVehicle = factory.createOne(Vehicle);
