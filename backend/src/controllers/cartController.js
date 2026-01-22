const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        quantity: quantity || 1,
        price: product.price,
        name: product.name,
        image: product.images?.[0] || '',
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart item updated',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [], updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
