const Review = require("../models/Review");

// Post a review
exports.postReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      user: req.user.id,
      product: productId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate("user", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to get reviews" });
  }
};
