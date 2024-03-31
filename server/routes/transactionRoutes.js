const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const {
  getAllTransactions,
  getTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.use(isLoggedIn);

router.get("/", getAllTransactions);
router.get("/:id", getTransaction);

module.exports = router;
