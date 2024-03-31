const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const { getFile } = require("../controllers/fileController");
const router = express.Router();

router.use(isLoggedIn);

router.get("/:filename", getFile);

module.exports = router;
