const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const UserNotification = require("../models/userNotificationModel");

exports.createUserNotification = factory.createOne(UserNotification);

exports.getUser = factory.getOne(UserNotification);
