const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../controllers/authController");

const { createPayment } = require("../controllers/paymentController");

router.use(isLoggedIn);
router.post("/link", createPayment);
// router.get("/status", getTransactionStatus);

module.exports = router;
