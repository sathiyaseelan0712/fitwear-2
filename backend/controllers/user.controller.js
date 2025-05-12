const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "fitwear";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Signup Controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    const token = generateToken(newUser);
    console.log(token);
    res.status(201).json({
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the reset token via email (implement email sending logic here)
    // Example: await sendEmail(user.email, 'Password Reset', `Your reset token: ${resetToken}`);
    console.log(`Generated reset token: ${resetToken}`); // Log for debugging purposes

    // Send the reset token via email (implement email sending logic here)
    // Example: await sendEmail(user.email, 'Password Reset', `Your reset token: ${resetToken}`);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Profile Controller (for fetching user details)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user is populated by middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
