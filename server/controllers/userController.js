const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const factory = require("./handlerFactory");
const User = require("../models/userModel");

exports.createUser = factory.createOne(User);



exports.getUser = factory.getOne(User);
