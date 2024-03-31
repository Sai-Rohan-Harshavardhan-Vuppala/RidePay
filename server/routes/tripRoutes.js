const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const {
  getAllTrips,
  createTripsFromSchedule,
  getSchedule,
} = require("../controllers/tripController");
const router = express.Router();

router.use(isLoggedIn);

router.get("/schedule", getSchedule);
router.post("/schedule", createTripsFromSchedule);
// router.get("/:id", getTrip);

module.exports = router;
