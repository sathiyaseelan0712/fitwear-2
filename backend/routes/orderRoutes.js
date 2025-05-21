const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order Routes
router.post('/create', orderController.createOrder);
router.get('/user/:userId', orderController.getOrdersByUser);
router.get('/all', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
