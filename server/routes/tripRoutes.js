const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const { getAllTrips, createTripsFromSchedule } = require("../controllers/tripController");
const router = express.Router();

router.use(isLoggedIn);

router.get("/", getAllTrips);
router.post("/schedule", createTripsFromSchedule);
// router.get("/:id", getTrip);

module.exports = router;
