const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const {
  getAllTransactions,
  getTransaction,
} = require("../controllers/transactionController");
const { restrictTo } = require("../controllers/authController");
const router = express.Router();

router.use(isLoggedIn);
router.get("/:id", getTransaction);

// router.use(restrictTo("admin"));
router.get("/", getAllTransactions);

module.exports = router;
