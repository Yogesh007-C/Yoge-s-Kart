const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const config = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
