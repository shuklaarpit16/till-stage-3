const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User Registration
router.post("/register", authController.registerUser);

// User Login
router.post("/login", authController.loginUser);

module.exports = router;



