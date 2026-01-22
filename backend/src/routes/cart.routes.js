const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/', updateCartItem);
router.delete('/:productId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
