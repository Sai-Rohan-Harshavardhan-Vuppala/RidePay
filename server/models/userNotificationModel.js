const mongoose = require("mongoose");

const userNotificationSchema = new mongoose.Schema({
  notif: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seen: { type: Boolean, required: true, default: false },
});

const UserNotification = mongoose.model(
  "UserNotification",
  userNotificationSchema
);
module.exports = UserNotification;
