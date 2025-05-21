const express = require("express");
const router = express.Router();

const  userController = require("../controllers/userController");

const middleware = require("../middleware/authMiddleware");

router.get("/profile",middleware.protect,  userController.getProfile);
router.put("/profile",middleware.protect,  userController.updateProfile);
router.get("/",middleware.protect, middleware.isAdmin, userController.getAllUsers);
router.delete("/:id",middleware.protect,middleware.isAdmin, userController.deleteUser);

router.post("/cart", middleware.protect, userController.addToCart);
router.delete("/cart/:itemId", middleware.protect, userController.removeFromCart);

// Wishlist routes
router.get("/wishlist", middleware.protect, userController.getWishlist);
router.post("/wishlist", middleware.protect, userController.addToWishlist);
router.delete("/wishlist/:productId", middleware.protect, userController.removeFromWishlist);

module.exports = router;
