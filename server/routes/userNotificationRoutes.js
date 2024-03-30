const express = require("express");
const userNotificationController = require("../controllers/userNotificationController");

const router = express.Router();

router.post("/", userNotificationController.createUserNotification);

module.exports = router;
