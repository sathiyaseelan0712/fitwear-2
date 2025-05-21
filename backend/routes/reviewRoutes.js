const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  getUserReviews
} = require('../controllers/reviewController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.route('/')
  .post(authenticateUser, createReview)
  .get(getReviews);

router.route('/user/:userId')
  .get(authenticateUser, getUserReviews);

router.route('/:id')
  .get(getReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

// For getting all reviews for a specific product
router.route('/products/:productId/reviews')
  .get(getReviews);

module.exports = router;