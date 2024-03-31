const express = require("express");
const stopController = require("../controllers/stopController");

const router = express.Router();

router.post("/", stopController.createStop);
router.get("/", stopController.getAllStops);

module.exports = router;
