const express = require("express");
const userNotificationController = require("../controllers/userNotificationController");

const router = express.Router();

router.post("/", userNotificationController.createUserNotification);
router.post("/markseen",userNotificationController.markSeenNotifications);

module.exports = router;
