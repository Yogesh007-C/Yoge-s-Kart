const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder,
} = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderDetails);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
