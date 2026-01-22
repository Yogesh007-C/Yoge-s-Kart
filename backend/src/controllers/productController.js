const Product = require('../models/Product');

// Get all products with pagination and filtering
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, sku, stock, images } = req.body;

    const existingSKU = await Product.findOne({ sku });
    if (existingSKU) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      category,
      sku,
      stock,
      images,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
