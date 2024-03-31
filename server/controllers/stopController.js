const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const Stop = require("../models/stopModel");

exports.createStop = factory.createOne(Stop);

exports.getAllStops = factory.getAll(Stop);
