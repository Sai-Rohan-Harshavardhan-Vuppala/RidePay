const express = require("express");
const stopController = require("../controllers/stopController");
const { restrictTo, isLoggedIn } = require("../controllers/authController");

const router = express.Router();

router.use(isLoggedIn);
router.use(restrictTo("admin"));
router.post("/", stopController.createStop);
router.get("/", stopController.getAllStops);

module.exports = router;
