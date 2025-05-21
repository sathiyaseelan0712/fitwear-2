const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// JWT Configuration (separate from DB connection)
const jwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'fitwear',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};

module.exports = {
  connectDB,
  jwtConfig
};