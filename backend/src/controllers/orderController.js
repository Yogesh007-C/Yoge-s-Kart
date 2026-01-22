const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
};

// Create order
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const items = [];

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${cartItem.productId} not found` });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      items.push({
        productId: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        name: product.name,
      });

      totalAmount += product.price * cartItem.quantity;

      // Reduce stock
      product.stock -= cartItem.quantity;
      await product.save();
    }

    const order = new Order({
      userId: req.user._id,
      orderNumber: generateOrderNumber(),
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Clear cart
    await Cart.updateOne({ userId: req.user._id }, { items: [] });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order details
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    console.log('Cancel order called for ID:', req.params.id);
    console.log('User ID:', req.user._id);
    
    const order = await Order.findById(req.params.id);
    console.log('Order found:', order);

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      console.log('Unauthorized - order user:', order.userId, 'current user:', req.user._id);
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (order.status !== 'pending') {
      console.log('Order cannot be cancelled - status:', order.status);
      return res.status(400).json({ success: false, message: `Order cannot be cancelled - current status: ${order.status}` });
    }

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = 'cancelled';
    await order.save();
    
    console.log('Order cancelled successfully:', order);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder,
};
