const express = require("express");
const routeController = require("../controllers/routeController");

const router = express.Router();

router.post("/", routeController.createRoute);
router.get("/", routeController.getAllRoutes);

module.exports = router;
