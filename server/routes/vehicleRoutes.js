const express = require("express");
const { createVehicle, getAllVehicles } = require("../controllers/vehicleController");

const router = express.Router();

router.post("/", createVehicle);
router.get("/", getAllVehicles);

module.exports = router;
