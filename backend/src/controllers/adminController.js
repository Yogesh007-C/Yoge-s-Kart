const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .populate('userId', 'username email')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users (admin)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  updateOrderStatus,
};
