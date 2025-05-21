const Product = require("../models/Product");

// Admin: Add new product
exports.addProduct = async (req, res) => {
  try {
    let { category } = req.body;
    if (typeof category === 'string') {
      category = category.replace(/^"|"$/g, '');
    }

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push({
          data: file.buffer.toString('base64'),
          contentType: file.mimetype
        });
      });
    } else if (req.body.images && Array.isArray(req.body.images)) {
      req.body.images.forEach(img => {
        if (img.data && img.contentType) {
          images.push({
            data: img.data,
            contentType: img.contentType
          });
        }
      });
    }

    const product = new Product({
      ...req.body,
      category,
      images
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ FIXED: Include only first image to avoid huge data
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}, {
      name: 1,
      price: 1,
      sizes: 1,
      material: 1,
      images: { $slice: 1 } // only send the first image
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Serve image by index
exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.images[req.params.imageIndex]) {
      return res.status(404).send("Image not found");
    }

    const image = product.images[req.params.imageIndex];
    const imgBuffer = Buffer.from(image.data, 'base64');

    res.set("Content-Type", image.contentType);
    res.send(imgBuffer);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
