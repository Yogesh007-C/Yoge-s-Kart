const mongoose = require('mongoose');
const { CATEGORIES } = require('../utils/constants');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: [true, 'Please provide a category'],
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    default: 0,
  },
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String,
      createdAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
