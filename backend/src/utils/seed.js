const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yoges-kart');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Connection Error:', error);
    process.exit(1);
  }
};

const sampleProducts = [
  // Electronics - Tech Gadgets
  { name: 'Wireless Bluetooth Headphones', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life', price: 4999, category: 'Electronics', stock: 50, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'], sku: 'WBH-001' },
  { name: 'USB-C Fast Charger', description: '65W USB-C Power Delivery Charger compatible with laptops and phones', price: 1999, category: 'Electronics', stock: 100, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'USC-001' },
  { name: 'Mechanical Gaming Keyboard', description: 'RGB Mechanical Keyboard with Cherry MX switches and programmable keys', price: 7999, category: 'Electronics', stock: 35, images: ['https://images.unsplash.com/photo-1587829191301-4ec2b8dab4ed?w=500&h=500&fit=crop'], sku: 'MGK-001' },
  { name: 'Wireless Gaming Mouse', description: 'Ergonomic wireless mouse with 16000 DPI and 70-hour battery', price: 2999, category: 'Electronics', stock: 60, images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'], sku: 'WGM-001' },
  { name: '4K Webcam', description: '4K Ultra HD Webcam with auto-focus and built-in microphone', price: 5999, category: 'Electronics', stock: 25, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'], sku: 'WCM-001' },
  { name: 'Laptop Stand Aluminum', description: 'Adjustable aluminum laptop stand for better ergonomics', price: 1499, category: 'Electronics', stock: 75, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'LPS-001' },
  { name: 'Portable Power Bank 20000mAh', description: '20000mAh power bank with fast charging support', price: 1499, category: 'Electronics', stock: 120, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'PPC-001' },
  { name: 'Tempered Glass Screen Protector Set', description: 'Pack of 3 tempered glass screen protectors with installation kit', price: 399, category: 'Electronics', stock: 200, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'], sku: 'SPT-001' },
  { name: 'Silicone Phone Case', description: 'Durable silicone phone case with shock absorption', price: 499, category: 'Electronics', stock: 150, images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop'], sku: 'PC-001' },
  { name: 'Adjustable Tablet Stand', description: 'Adjustable tablet holder for desk or bed', price: 799, category: 'Electronics', stock: 85, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'TS-001' },
  { name: 'Micro USB Cable Pack 5pcs', description: 'Set of 5 durable Micro USB charging cables', price: 399, category: 'Electronics', stock: 150, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'MUC-001' },
  { name: 'HDMI 2.0 Cable 2M', description: '4K HDMI 2.0 cable with gold-plated connectors', price: 299, category: 'Electronics', stock: 200, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'HDMI-001' },
  { name: 'Bluetooth Speaker Portable', description: 'Waterproof portable Bluetooth speaker with 360-degree sound', price: 1999, category: 'Electronics', stock: 80, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'], sku: 'BTS-001' },
  { name: 'USB Hub 7-Port', description: '7-port USB 3.0 hub with individual switch and LED', price: 1299, category: 'Electronics', stock: 60, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'UH7-001' },
  { name: 'Wireless Mouse and Keyboard Combo', description: 'Combo set with wireless mouse and keyboard', price: 1599, category: 'Electronics', stock: 70, images: ['https://images.unsplash.com/photo-1587829191301-4ec2b8dab4ed?w=500&h=500&fit=crop'], sku: 'MKC-001' },
  { name: 'LED Desk Lamp with USB', description: 'Adjustable LED desk lamp with USB charging port', price: 799, category: 'Electronics', stock: 90, images: ['https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop'], sku: 'LDL-001' },
  { name: 'External SSD 1TB', description: 'Portable 1TB external SSD with USB 3.1', price: 4999, category: 'Electronics', stock: 45, images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop'], sku: 'ESS-001' },
  { name: 'Monitor Stand Adjustable', description: 'Adjustable monitor stand with storage drawer', price: 1799, category: 'Electronics', stock: 55, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'MAS-001' },
  { name: 'Cable Organizer Set', description: 'Cable management organizer set with clips and sleeves', price: 399, category: 'Electronics', stock: 180, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'COS-001' },
  { name: 'Wireless Charging Pad', description: 'Fast wireless charging pad compatible with all Qi devices', price: 899, category: 'Electronics', stock: 100, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'WCP-001' },
  { name: 'Mechanical Keyboard RGB', description: 'Full-size mechanical keyboard with RGB lighting and programmable keys', price: 6999, category: 'Electronics', stock: 45, images: ['https://images.unsplash.com/photo-1587829191301-4ec2b8dab4ed?w=500&h=500&fit=crop'], sku: 'MKR-001' },
  { name: 'Wireless Mouse Pro', description: 'Professional wireless mouse with ergonomic design', price: 1899, category: 'Electronics', stock: 110, images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'], sku: 'WMP-001' },
  { name: '27 inch Monitor 4K', description: '27 inch 4K monitor with USB-C and HDR support', price: 24999, category: 'Electronics', stock: 20, images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop'], sku: 'MON4K-001' },
  { name: 'USB-C Docking Station', description: '9-in-1 USB-C docking station with HDMI and USB ports', price: 3999, category: 'Electronics', stock: 55, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'USCD-001' },
  { name: 'Portable Projector 1080p', description: 'Portable 1080p projector with built-in speaker', price: 12999, category: 'Electronics', stock: 30, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'], sku: 'PROJ-001' },
  { name: 'Wireless Earbuds True', description: 'True wireless earbuds with noise cancellation and 8-hour battery', price: 3499, category: 'Electronics', stock: 95, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'], sku: 'WEB-001' },
  { name: 'WiFi 6 Router', description: 'High-speed WiFi 6 router with mesh support', price: 5999, category: 'Electronics', stock: 40, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'WR6-001' },
  { name: 'USB-A to USB-C Cable', description: 'High-speed USB-A to USB-C cable 3 meters', price: 399, category: 'Electronics', stock: 250, images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop'], sku: 'UTC-001' },
  { name: 'Phone Stand Adjustable', description: 'Adjustable phone stand for desk compatible with all sizes', price: 599, category: 'Electronics', stock: 140, images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'], sku: 'PSA-001' },
  { name: 'Camera Tripod 1.7m', description: 'Professional camera tripod with fluid head', price: 2499, category: 'Electronics', stock: 35, images: ['https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop'], sku: 'CTR-001' },
  { name: 'Blue Cotton T-Shirt', description: 'Comfortable 100% cotton blue t-shirt with premium finish', price: 599, category: 'Fashion', stock: 200, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], sku: 'BCT-001' },
  { name: 'Black Denim Jeans', description: 'Premium black denim jeans with perfect fit', price: 1299, category: 'Fashion', stock: 150, images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'], sku: 'BJ-001' },
  { name: 'White Casual Sneakers', description: 'Stylish white casual sneakers with comfortable sole', price: 2499, category: 'Fashion', stock: 100, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], sku: 'WCS-001' },
  { name: 'Black Leather Jacket', description: 'Premium quality black leather jacket with silk lining', price: 8999, category: 'Fashion', stock: 40, images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop'], sku: 'LJ-001' },
  { name: 'UV Protection Sunglasses', description: 'Stylish UV protection sunglasses with polarized lenses', price: 1599, category: 'Fashion', stock: 80, images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'], sku: 'SS-001' },
  { name: 'Smartwatch Fitness Tracker', description: 'Smart sports watch with fitness tracking and heart rate monitor', price: 3999, category: 'Fashion', stock: 60, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'], sku: 'SW-001' },
  { name: 'Adjustable Cotton Sports Cap', description: 'Adjustable cotton sports cap with embroidered logo', price: 499, category: 'Fashion', stock: 120, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], sku: 'CSC-001' },
  { name: 'Warm Wool Winter Scarf', description: 'Warm and cozy wool scarf perfect for winter', price: 899, category: 'Fashion', stock: 100, images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'], sku: 'WS-001' },
  { name: 'Durable Canvas Backpack', description: 'Durable canvas backpack with laptop compartment', price: 1699, category: 'Fashion', stock: 70, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'], sku: 'CB-001' },
  { name: 'Red Athletic Running Shoes', description: 'Lightweight running shoes with gel cushioning', price: 3499, category: 'Fashion', stock: 80, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], sku: 'RRS-001' },
  { name: 'Elegant Leather Handbag', description: 'Stylish leather handbag for women with multiple compartments', price: 4999, category: 'Fashion', stock: 35, images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'], sku: 'DHB-001' },
  { name: 'Grey Hoodie Sweatshirt', description: 'Comfortable grey hoodie with kangaroo pocket', price: 1099, category: 'Fashion', stock: 110, images: ['https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop'], sku: 'GHS-001' },
  { name: 'White Dress Shirt', description: 'Classic white dress shirt perfect for office wear', price: 1499, category: 'Fashion', stock: 90, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], sku: 'WDS-001' },
  { name: 'Black Formal Shoes', description: 'Professional black formal shoes with leather sole', price: 2999, category: 'Fashion', stock: 50, images: ['https://images.unsplash.com/photo-1543163521-9efcc06814ee?w=500&h=500&fit=crop'], sku: 'BFS-001' },
  { name: 'Cotton Socks Pack 12', description: 'Pack of 12 comfortable cotton socks', price: 399, category: 'Fashion', stock: 250, images: ['https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop'], sku: 'SPK-001' },
  { name: 'Polo T-Shirt White', description: 'Classic white polo t-shirt with collar', price: 799, category: 'Fashion', stock: 130, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], sku: 'PTW-001' },
  { name: 'Slim Fit Blue Jeans', description: 'Slim fit blue jeans with stretch fabric', price: 1599, category: 'Fashion', stock: 120, images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'], sku: 'SFJ-001' },
  { name: 'Black Formal Blazer', description: 'Professional black formal blazer for business wear', price: 4999, category: 'Fashion', stock: 50, images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop'], sku: 'BFB-001' },
  { name: 'Casual Chinos Brown', description: 'Comfortable brown chino pants for casual wear', price: 1299, category: 'Fashion', stock: 100, images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'], sku: 'CCB-001' },
  { name: 'Blue Tracksuit', description: 'Comfortable blue tracksuit with hoodie', price: 1999, category: 'Fashion', stock: 85, images: ['https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop'], sku: 'BTS-002' },
  { name: 'Striped Long Sleeve', description: 'Comfortable striped long sleeve shirt', price: 899, category: 'Fashion', stock: 110, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], sku: 'SLS-001' },
  { name: 'White Sneaker Shoes', description: 'Professional white sneaker shoes for everyday wear', price: 2199, category: 'Fashion', stock: 95, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], sku: 'WSN-001' },
  { name: 'Black Boot Shoes', description: 'Stylish black combat boots', price: 3299, category: 'Fashion', stock: 60, images: ['https://images.unsplash.com/photo-1543163521-9efcc06814ee?w=500&h=500&fit=crop'], sku: 'BBS-001' },
  { name: 'Winter Parka Jacket', description: 'Warm winter parka jacket with insulation', price: 6999, category: 'Fashion', stock: 45, images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop'], sku: 'WPJ-001' },
  { name: 'Denim Shorts', description: 'Comfortable blue denim shorts', price: 799, category: 'Fashion', stock: 120, images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'], sku: 'DST-001' },
  { name: 'JavaScript: The Good Parts', description: 'Essential guide to JavaScript programming by Douglas Crockford', price: 499, category: 'Books', stock: 50, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'JSGP-001' },
  { name: 'Clean Code', description: 'A Handbook of Agile Software Craftsmanship by Robert Martin', price: 599, category: 'Books', stock: 45, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'CC-001' },
  { name: 'The Pragmatic Programmer', description: 'Your Journey to Mastery in Software Development', price: 699, category: 'Books', stock: 40, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'PP-001' },
  { name: 'Design Patterns', description: 'Elements of Reusable Object-Oriented Software by Gang of Four', price: 749, category: 'Books', stock: 35, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'DP-001' },
  { name: 'Cracking the Coding Interview', description: '189 Programming Questions and Solutions for job interviews', price: 799, category: 'Books', stock: 60, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'CCI-001' },
  { name: 'Atomic Habits', description: 'Tiny Changes, Remarkable Results by James Clear', price: 549, category: 'Books', stock: 70, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'AH-001' },
  { name: 'Learning Node.js', description: 'Complete guide to building applications with Node.js', price: 649, category: 'Books', stock: 55, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'LN-001' },
  { name: 'MongoDB Guide', description: 'Complete guide to MongoDB database and NoSQL', price: 699, category: 'Books', stock: 50, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'MG-001' },
  { name: 'React for Beginners', description: 'Learn React from scratch and build modern UIs', price: 749, category: 'Books', stock: 65, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'RB-001' },
  { name: 'Web Development Fundamentals', description: 'Master HTML, CSS, and JavaScript basics', price: 599, category: 'Books', stock: 80, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'WDF-001' },
  { name: 'Python Programming Master', description: 'Comprehensive Python programming guide for beginners and advanced', price: 799, category: 'Books', stock: 55, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'PPM-001' },
  { name: 'Java for Enterprise', description: 'Building scalable enterprise applications with Java', price: 899, category: 'Books', stock: 45, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'JFE-001' },
  { name: 'System Design Interview', description: 'Complete guide to system design interviews', price: 849, category: 'Books', stock: 50, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'SDI-001' },
  { name: 'Advanced JavaScript', description: 'Master advanced JavaScript concepts and patterns', price: 749, category: 'Books', stock: 45, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'AJS-001' },
  { name: 'Web Security Essentials', description: 'Essential guide to web security and best practices', price: 699, category: 'Books', stock: 40, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'WSE-001' },
  { name: 'CSS Advanced Techniques', description: 'Advanced CSS techniques and responsive design', price: 599, category: 'Books', stock: 55, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'CAT-001' },
  { name: 'Vue.js Complete Guide', description: 'Complete guide to Vue.js framework', price: 749, category: 'Books', stock: 50, images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'], sku: 'VCG-001' },
  { name: 'Yoga Mat Non-Slip', description: 'Premium non-slip yoga mat with carrying strap', price: 1299, category: 'Sports', stock: 85, images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop'], sku: 'YM-001' },
  { name: 'Dumbbells Adjustable Set', description: 'Adjustable dumbbells set 5-25kg with carrying rack', price: 8999, category: 'Sports', stock: 30, images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop'], sku: 'DAL-001' },
  { name: 'Resistance Bands Set', description: 'Set of 5 resistance bands for strength training', price: 799, category: 'Sports', stock: 120, images: ['https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop'], sku: 'RBS-001' },
  { name: 'Gym Duffel Bag', description: 'Large capacity gym duffel bag with shoe compartment', price: 1599, category: 'Sports', stock: 60, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'], sku: 'GDB-001' },
  { name: 'Water Bottle 1L', description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours', price: 799, category: 'Sports', stock: 150, images: ['https://images.unsplash.com/photo-1602143407151-7e406b488b4d?w=500&h=500&fit=crop'], sku: 'WB1L-001' },
  { name: 'Jump Rope Speed', description: 'Professional speed jump rope for fitness training', price: 599, category: 'Sports', stock: 100, images: ['https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop'], sku: 'JRS-001' },
  { name: 'Running Socks Moisture', description: 'Pack of 6 moisture-wicking running socks', price: 599, category: 'Sports', stock: 150, images: ['https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop'], sku: 'RSM-001' },
  { name: 'Gym Gloves Leather', description: 'Professional leather gym gloves with wrist support', price: 899, category: 'Sports', stock: 80, images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop'], sku: 'GGL-001' },
  { name: 'Yoga Blocks Foam', description: 'Set of 2 foam yoga blocks for support', price: 699, category: 'Sports', stock: 95, images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop'], sku: 'YBF-001' },
  { name: 'Fitness Tracker Band', description: 'Smart fitness tracker band with heart rate monitor', price: 2499, category: 'Sports', stock: 70, images: ['https://images.unsplash.com/photo-1575311373937-040b3e6f5eda?w=500&h=500&fit=crop'], sku: 'FTB-001' },
  { name: 'Swimming Goggles', description: 'Professional swimming goggles with UV protection', price: 599, category: 'Sports', stock: 110, images: ['https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop'], sku: 'SGG-001' },
  { name: 'Cycling Helmet', description: 'Safety certified cycling helmet with ventilation', price: 1999, category: 'Sports', stock: 60, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'], sku: 'CHM-001' },
  { name: 'Foam Roller 45cm', description: 'Massage foam roller for muscle recovery', price: 799, category: 'Sports', stock: 100, images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop'], sku: 'FRM-001' },
  { name: 'LED String Lights', description: 'Decorative LED string lights 10 meters with warm white', price: 699, category: 'Home', stock: 100, images: ['https://images.unsplash.com/photo-1565182999555-e3024aaf0d51?w=500&h=500&fit=crop'], sku: 'LSL-001' },
  { name: 'Indoor Plant Pot', description: 'Ceramic indoor plant pot with drainage hole', price: 499, category: 'Home', stock: 120, images: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop'], sku: 'IPP-001' },
  { name: 'Desk Organizer Set', description: 'Multi-compartment desk organizer for office supplies', price: 799, category: 'Home', stock: 80, images: ['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop'], sku: 'DOS-001' },
  { name: 'Wall Clock Modern', description: 'Modern wall clock with silent movement', price: 899, category: 'Home', stock: 70, images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1e?w=500&h=500&fit=crop'], sku: 'WCM-002' },
  { name: 'Storage Boxes Set 5', description: 'Set of 5 foldable storage boxes with labels', price: 1199, category: 'Home', stock: 90, images: ['https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop'], sku: 'SBS-001' },
  { name: 'Wall Art Canvas 3D', description: '3D wall art canvas for modern home decor', price: 1599, category: 'Home', stock: 50, images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop'], sku: 'WAC-001' },
  { name: 'Throw Pillow Set 2', description: 'Set of 2 decorative throw pillows', price: 899, category: 'Home', stock: 100, images: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop'], sku: 'TPS-001' },
  { name: 'Wall Mount Shelf', description: 'Floating wall mount shelf with metal support', price: 1299, category: 'Home', stock: 70, images: ['https://images.unsplash.com/photo-1485749967868-7aab60d2bed1?w=500&h=500&fit=crop'], sku: 'WMS-001' },
  { name: 'Curtain Rod Stainless', description: 'Stainless steel curtain rod with brackets', price: 1199, category: 'Home', stock: 80, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=500&fit=crop'], sku: 'CRS-001' },
  { name: 'Area Rug 150x200cm', description: 'Soft area rug perfect for any room', price: 2999, category: 'Home', stock: 40, images: ['https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop'], sku: 'ARG-001' },
  { name: 'Desk Lamp USB Charging', description: 'LED desk lamp with USB charging port', price: 999, category: 'Home', stock: 85, images: ['https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop'], sku: 'DLU-001' },
  { name: 'Gaming Headset Pro', description: 'Professional gaming headset with 7.1 surround sound', price: 3499, category: 'Gaming', stock: 50, images: ['https://images.unsplash.com/photo-1550258987-920a2eae0c47?w=500&h=500&fit=crop'], sku: 'GHP-001' },
  { name: 'Gaming Mouse Pad XL', description: 'Extra large gaming mouse pad with anti-slip base', price: 899, category: 'Gaming', stock: 100, images: ['https://images.unsplash.com/photo-1587829191301-4ec2b8dab4ed?w=500&h=500&fit=crop'], sku: 'GMP-001' },
  { name: 'RGB Gaming Chair', description: 'Ergonomic RGB gaming chair with lumbar support', price: 12999, category: 'Gaming', stock: 25, images: ['https://images.unsplash.com/photo-1577720643272-265e434f7d0b?w=500&h=500&fit=crop'], sku: 'RGC-001' },
  { name: 'Game Controller Wireless', description: 'Wireless game controller compatible with PC and consoles', price: 2299, category: 'Gaming', stock: 75, images: ['https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=500&h=500&fit=crop'], sku: 'GCW-001' },
  { name: 'Gaming Desk 160cm', description: 'Large gaming desk with cable management', price: 8999, category: 'Gaming', stock: 25, images: ['https://images.unsplash.com/photo-1593085512500-5d5afed5d3f0?w=500&h=500&fit=crop'], sku: 'GDS-001' },
  { name: 'Game Monitor 144Hz', description: '27 inch gaming monitor with 144Hz refresh rate', price: 18999, category: 'Gaming', stock: 20, images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop'], sku: 'GMN-001' },
  { name: 'Facial Skincare Set', description: 'Complete facial skincare set with cleanser, toner, and moisturizer', price: 1999, category: 'Beauty', stock: 80, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'FSS-001' },
  { name: 'Hair Dryer 2000W', description: 'Professional hair dryer with ionic technology', price: 2499, category: 'Beauty', stock: 60, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'HD2K-001' },
  { name: 'Electric Toothbrush', description: 'Sonic electric toothbrush with 5 cleaning modes', price: 1799, category: 'Beauty', stock: 70, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'ETB-001' },
  { name: 'Makeup Brush Set 15pcs', description: 'Professional makeup brush set with carrying pouch', price: 1299, category: 'Beauty', stock: 85, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'MBS-001' },
  { name: 'Facial Cleansing Brush', description: 'Electric facial cleansing brush with 3 modes', price: 2199, category: 'Beauty', stock: 65, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'FCB-001' },
  { name: 'Face Mask Sheet Pack', description: 'Pack of 10 hydrating face mask sheets', price: 699, category: 'Beauty', stock: 120, images: ['https://images.unsplash.com/photo-1596617065559-e4c5efd3d7b2?w=500&h=500&fit=crop'], sku: 'FMP-001' }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${result.length} products!`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();
