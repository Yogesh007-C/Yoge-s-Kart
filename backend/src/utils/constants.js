// User Roles
const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Product Categories
const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Books',
  'Home',
  'Sports',
  'Gaming',
  'Beauty',
];

module.exports = {
  ROLES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  CATEGORIES,
};
