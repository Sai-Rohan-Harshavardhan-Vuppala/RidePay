const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Provide the message displayed in the notification"],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  link: { type: String },
});
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
