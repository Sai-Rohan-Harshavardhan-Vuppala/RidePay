const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const userNotificationController = require("../controllers/userNotificationController");

const router = express.Router();
router.use(isLoggedIn);
router.post("/", userNotificationController.createUserNotification);
router.post("/markseen", userNotificationController.markSeenNotifications);

module.exports = router;
