const express = require("express");
const { createVehicle, getAllVehicles } = require("../controllers/vehicleController");
const { restrictTo, isLoggedIn } = require("../controllers/authController");

const router = express.Router();

router.use(isLoggedIn);
router.use(restrictTo("admin"));
router.post("/", createVehicle);
router.get("/", getAllVehicles);

module.exports = router;
