const express = require("express");
const { updateUser } = require("../controllers/userController");
const { isLoggedIn } = require("../controllers/authController");
const { resizeAndUploadFile, uploadSingle } = require("../controllers/fileController");
const router = express.Router();

router.use(isLoggedIn);

router.patch("/", uploadSingle, resizeAndUploadFile, updateUser);

module.exports = router;
