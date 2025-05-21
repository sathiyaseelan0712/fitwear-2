// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: { 
    type: String, 
    enum: ["Shirts", "Jeans", "T-Shirts", "Accessories", "Footwear"],
    required: true 
  },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, default: 0 },
  images: [{
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  }],
  brand: { type: String },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);