const express = require("express");
const router = express.Router();

const { createPaymentLink } = require("../controllers/paymentController");

// router.post("/link", createPaymentLink);
// router.get("/status", getTransactionStatus);

module.exports = router;
