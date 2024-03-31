const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const Notification = require("../models/notificationModel");
const UserNotification = require("../models/userNotificationModel");

exports.createNotification = factory.createOne(Notification);

exports.getNotificationDetails = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;
  if (!ids || ids.length === 0) {
    return next(new AppError("No IDs provided", 400));
  }

  const notifications = await Notification.find({ _id: { $in: ids } });

  // If no notifications found, it's not necessarily an error, but could return an empty array
  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: notifications,
  });
});

exports.getAllNotifications = catchAsync(async (req, res, next) => {
  const notifications = await UserNotification.find({ user: req.user._id }).populate(
    "notif"
  );
  res.send(notifications);
});


exports.getNotification = factory.getOne(Notification);
