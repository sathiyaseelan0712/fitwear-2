// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../utils/multerConfig");
const { isAdmin } = require("../middleware/authMiddleware");

// Admin routes
router.post(
  "/", 
  isAdmin, 
  upload.array("images", 5), // Max 5 images
  productController.addProduct
);

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.get("/:id/image/:imageIndex", productController.getProductImage);

module.exports = router;