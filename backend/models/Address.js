// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: String,
  city: String,
  state: String,
  pincode: String,
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);
