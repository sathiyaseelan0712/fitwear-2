const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/email");
const VerificationToken = require("../models/VerificationToken");
const { jwtConfig } = require("../config/db");

// Utility Functions
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (user) => jwt.sign(
  { id: user.id, role: user.role },
  jwtConfig.JWT_SECRET,
  { expiresIn: jwtConfig.JWT_EXPIRES_IN }
);

// Auth Controllers
exports.register = async (req, res) => {
  const { name, email, password, username } = req.body;

  try {
    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await User.create({
      name,
      email,
      username, // Add username to the new user
      password,
      role: "user",
      isVerified: false
    });

    const otp = generateOTP();
    await VerificationToken.create({
      userId: newUser._id,
      token: otp,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await sendVerificationEmail(newUser.email, otp);

    res.status(201).json({
      message: "Verification OTP sent to your email",
      userId: newUser._id
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const token = await VerificationToken.findOne({
      userId,
      token: otp,
      expiresAt: { $gt: new Date() }
    });

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    await VerificationToken.deleteOne({ _id: token._id });
    const jwtToken = generateToken(user);

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: true
      },
      message: "Account verified successfully"
    });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and include password in the result
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare plaintext passwords directly
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Account not verified",
        userId: user._id
      });
    }

    const token = generateToken(user);
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: true
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      message: "Server error during login",
      error: error.message 
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and set expiry (10 minutes from now)
    const otp = generateOTP();
    const resetTokenExpiry = new Date(Date.now() + 600000); // 10 minutes

    // Save OTP and expiry to user document
    user.resetToken = otp;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email with OTP
    await sendPasswordResetEmail(user.email, otp);

    res.json({
      message: "Password reset OTP sent to your email",
      email: user.email // Return email for reference
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};

exports.verifyPasswordResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark the OTP as verified (we'll use this in resetPassword)
    user.isResetTokenVerified = true;
    await user.save();

    res.json({ 
      message: "OTP verified successfully",
      email: user.email
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user with verified reset token
    const user = await User.findOne({
      email,
      isResetTokenVerified: true
    });

    if (!user) {
      return res.status(400).json({ 
        message: "Password reset not initiated or OTP not verified" 
      });
    }

    // Update password and clear reset token fields
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.isResetTokenVerified = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};