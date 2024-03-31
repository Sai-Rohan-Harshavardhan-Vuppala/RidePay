const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("./handlerFactory");
const UserNotification = require("../models/userNotificationModel");

exports.createUserNotification = factory.createOne(UserNotification);


exports.markSeenNotifications = catchAsync(async (req, res, next) => {
    const userId = req.body.userId;

    if (!userId) {
        return next(new AppError('No user ID provided', 400));
    }

    await UserNotification.updateMany(
        { user: userId, seen: false }, 
        { seen: true } 
    );

    res.status(200).json({
        status: 'success',
        message: 'All notifications marked as seen'
    });
});

exports.getUserNotification = factory.getOne(UserNotification);
