const express = require('express');
const router = express.Router();
const { 
  register, 
  verifyOTP, 
  login,
  forgotPassword,
  verifyPasswordResetOTP,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register); 
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-reset-otp', verifyPasswordResetOTP);
router.post('/reset-password', resetPassword);

module.exports = router;