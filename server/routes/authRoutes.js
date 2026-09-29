const express = require('express');
const router = express.Router();
const { registerUser, verifyOTP, loginUser } = require('../controllers/authController');

// Register new user
router.post('/register', registerUser);

// Login user

router.post('/login', loginUser);

// Verify OTP

router.post('/verify-otp', verifyOTP);

module.exports = router;

