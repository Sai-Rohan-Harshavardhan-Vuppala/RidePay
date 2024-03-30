const express = require("express");
const router = express.Router();

const {
  login,
  isLoggedIn,
  getLoginStatus,
  logout,
} = require("../controllers/authController");

router.post("/login", login);

router.use(isLoggedIn);
router.get("/login-status", getLoginStatus);

router.post("/logout", logout);

module.exports = router;
