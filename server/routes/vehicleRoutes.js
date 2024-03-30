const express = require("express");
const vehicleController = require("../controllers/vehicleController");

const router = express.Router();

router.post("/addVehicle", vehicleController.createVehicle);

module.exports = router;
