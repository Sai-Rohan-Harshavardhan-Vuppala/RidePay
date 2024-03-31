const express = require("express");
const routeController = require("../controllers/routeController");
const { restrictTo, isLoggedIn } = require("../controllers/authController");
const router = express.Router();

router.use(isLoggedIn);
router.use(restrictTo("admin"));
router.post("/", routeController.createRoute);
router.get("/", routeController.getAllRoutes);

module.exports = router;
