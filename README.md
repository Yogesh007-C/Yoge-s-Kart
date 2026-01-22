# YOGE'S KART - E-Commerce Website

A full-stack e-commerce application built for a college project using React, Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Login & Registration with JWT)
- ✅ Product Listing with Filtering & Pagination
- ✅ Product Details Page
- ✅ Shopping Cart Management
- ✅ Checkout & Order Placement
- ✅ Order History & Tracking
- ✅ Admin Dashboard (Add/Edit/Delete Products)
- ✅ Responsive Design (Mobile & Desktop)

## Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Axios
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Bcryptjs (Password Hashing)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Authentication & validation
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Environment configuration
│   │   └── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── redux/           # State management
    │   ├── services/        # API calls
    │   ├── hooks/           # Custom React hooks
    │   ├── styles/          # Global CSS
    │   ├── utils/           # Utilities
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yoges-kart
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/orders` - All orders
- `GET /api/admin/users` - All users
- `PUT /api/admin/orders/:id/status` - Update order status

## Usage

### Customer Flow
1. Register or Login
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Place order
6. Track order status

### Admin Flow
1. Login with admin account
2. Navigate to Admin Dashboard
3. Add, edit, or delete products
4. View all orders and users
5. Update order status

## Demo Credentials

**Admin Account:**
- Email: admin@yogeskart.com
- Password: admin123

**Customer Account:**
- Email: user@yogeskart.com
- Password: user123

## Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- Product reviews & ratings
- Email notifications
- Advanced analytics dashboard
- Wishlist feature
- Product search optimization
- Real-time inventory updates

## College Project Requirements Met

✅ Frontend: HTML, CSS, JavaScript/React
✅ Responsive Design (Mobile + Desktop)
✅ Multiple Pages (Home, Products, Details, Cart, Auth, Checkout)
✅ Backend: Node.js with Express.js
✅ REST APIs for all features
✅ User Authentication (Login & Signup)
✅ Database: MongoDB with Collections (Users, Products, Orders)
✅ Add/Remove Cart functionality
✅ Order placement system
✅ Admin product management

## License

MIT License - College Project

## Author

Your Name - 2024
"# Yoge-s-Kart" 
