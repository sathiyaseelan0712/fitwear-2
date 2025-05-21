const User = require("../models/User");

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, username },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};


exports.addToCart = async (req, res) => {
  try {
    console.log(req.body);
    const { productId, quantity, size, color } = req.body;

    const user = await User.findById(req.user._id);

    const existingItem = user.cart.items.find(item =>
      item.product.toString() === productId &&
      item.size === size &&
      item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.items.push({ product: productId, quantity, size, color });
    }

    // Recalculate total
    const prices = await Promise.all(
      user.cart.items.map(async item => {
        const product = await Product.findById(item.product);
        return product.price * item.quantity;
      })
    );

    user.cart.totalPrice = prices.reduce((acc, price) => acc + price, 0);
    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  const user = await User.findById(req.user._id);
  user.cart.items = user.cart.items.filter(item => item._id.toString() !== itemId);

  // Recalculate total
  const prices = await Promise.all(
    user.cart.items.map(async item => {
      const product = await Product.findById(item.product);
      return product.price * item.quantity;
    })
  );

  user.cart.totalPrice = prices.reduce((acc, price) => acc + price, 0);
  await user.save();

  res.status(200).json(user.cart);
};

//
// ❤️ WISHLIST CONTROLLERS
//
exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.status(200).json(user.wishlist);
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.status(200).json(user.wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter(pid => pid.toString() !== productId);
  await user.save();

  res.status(200).json(user.wishlist);
};