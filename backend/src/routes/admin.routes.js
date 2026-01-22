const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  updateOrderStatus,
} = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.use(authenticateToken, isAdmin);

router.get('/dashboard/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
