// controllers/productController.js
const Product = require("../models/Product");

// Admin: Add new product
// In your productController.js
exports.addProduct = async (req, res) => {
  try {
    let { category } = req.body;
    
    // Remove surrounding quotes if present
    if (typeof category === 'string') {
      category = category.replace(/^"|"$/g, '');
    }

    const product = new Product({
      ...req.body,
      category // Use cleaned value
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-images.data"); // Exclude binary data
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Serve product image
exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.images[req.params.imageIndex]) {
      return res.status(404).send("Image not found");
    }

    const image = product.images[req.params.imageIndex];
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (err) {
    res.status(500).send("Server error");
  }
};