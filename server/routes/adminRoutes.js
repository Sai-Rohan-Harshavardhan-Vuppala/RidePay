const express = require("express");
const adminController = require("./../controllers/adminController");

const router = express.Router();

router.post("/addVehicle", adminController.createVehicle);

module.exports = router;
