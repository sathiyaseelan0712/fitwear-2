const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/db');
const User = require('../models/User');

// In authMiddleware.js
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use same secret as login
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Access denied");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error("Admin access required");

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};