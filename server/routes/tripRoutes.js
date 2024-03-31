const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const { getAllTrips, createTrip } = require("../controllers/tripController");
const router = express.Router();

router.use(isLoggedIn);

router.get("/", getAllTrips);
router.post("/", createTrip);
// router.get("/:id", getTrip);

module.exports = router;
