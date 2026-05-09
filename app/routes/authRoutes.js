const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

//register
router.post("/register", upload.single("avatar"), authController.register);

//login
router.post("/login", authController.login);

//logout
router.post("/logout", authController.logout);

module.exports = router;
