const mongoose = require('mongoose');
const { ORDER_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
      name: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.PENDING,
  },
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: Date,
});

module.exports = mongoose.model('Order', orderSchema);
