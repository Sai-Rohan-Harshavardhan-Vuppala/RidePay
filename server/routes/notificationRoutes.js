const express = require("express");
const {
  createNotification,
  getNotificationDetails,
  getAllNotifications,
} = require("../controllers/notificationController");
const { isLoggedIn, restrictTo } = require("../controllers/authController");
const router = express.Router();

router.use(isLoggedIn);

router.post("/", createNotification);
router.get("/details", getNotificationDetails);

// router.use(restrictTo("admin"));
router.get("/all", getAllNotifications);

module.exports = router;
