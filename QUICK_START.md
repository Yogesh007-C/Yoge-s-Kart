# YOGE'S KART - Quick Start Guide

## ⚡ 5-Minute Quick Start

### Prerequisites (First Time Only)
1. **Install Node.js LTS**: https://nodejs.org/
2. **Create MongoDB Account**: https://www.mongodb.com/cloud/atlas
3. **Create a Cluster** and whitelist IP `0.0.0.0/0`

---

## 🚀 Start the Application

### Terminal 1 - Backend
```bash
cd backend

# Copy .env.example to .env and add your MongoDB URI
cp .env.example .env

# Edit .env and add:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yoges-kart
# JWT_SECRET=your_secret_key

# Install and run
npm install
npm run dev
```
✅ Server will run on `http://localhost:5000`

### Terminal 2 - Frontend (New Terminal)
```bash
cd frontend

npm install
npm run dev
```
✅ Application will open on `http://localhost:3000`

---

## 📝 Default Test Accounts

You'll need to register first. Here's how to create an admin account:

1. Register normally through the UI
2. Go to MongoDB Atlas Collections
3. Find the user you just created
4. Edit the document and change `role` from `"customer"` to `"admin"`
5. Login again and you'll have admin access

---

## 🧪 Test the Application

### As a Customer:
1. ✅ Register/Login
2. ✅ Browse Products (empty initially)
3. ✅ Try Add to Cart (won't work without products)
4. ✅ View Cart
5. ✅ View Orders

### As an Admin:
1. ✅ Login with admin account
2. ✅ Go to Admin Dashboard (click "Admin" in navbar)
3. ✅ Add a Product:
   ```
   Name: Test Product
   Description: A test product
   Price: 99.99
   Category: Electronics
   SKU: TEST-001
   Stock: 50
   ```
4. ✅ Go back to Products and see your new product
5. ✅ Add to cart as customer
6. ✅ Checkout and place order
7. ✅ Go to Admin Dashboard to see order

---

## 📝 Key Files to Know

### Backend
- `backend/src/server.js` - Main entry point
- `backend/.env` - Configuration (create this)
- `backend/src/routes/*.js` - API endpoints
- `backend/src/models/*.js` - Database schemas

### Frontend  
- `frontend/src/App.jsx` - Main app component
- `frontend/src/pages/*.jsx` - Page components
- `frontend/src/redux/store.js` - State management
- `frontend/src/services/api.js` - API client

---

## 🐛 Troubleshooting

### "Cannot find module" Error
```bash
cd backend
npm install
# or
cd frontend
npm install
```

### "MongoDB Connection Failed"
- Check `.env` file has correct `MONGODB_URI`
- Verify IP whitelist in MongoDB Atlas (use `0.0.0.0/0` for dev)
- Check username and password in URI

### "Port Already in Use"
```bash
# Change PORT in backend/.env to 5001
# Or kill process on port 5000
```

### "npm: command not found"
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal after installation

---

## 📚 Project Structure
```
YOGE'S KART/
├── backend/         # Express server
├── frontend/        # React app
├── README.md        # Full documentation
├── SETUP_GUIDE.md   # Detailed setup
├── API_DOCUMENTATION.md  # API reference
└── IMPLEMENTATION_NOTES.md
```

---

## 🎯 Next Steps

1. ✅ Install Node.js
2. ✅ Set up MongoDB
3. ✅ Start backend (`npm run dev` in backend folder)
4. ✅ Start frontend (`npm run dev` in frontend folder)
5. ✅ Register and test features
6. ✅ Read full documentation for more details

---

## 📞 Need Help?

- **Setup Issues** → Read `SETUP_GUIDE.md`
- **API Reference** → Check `API_DOCUMENTATION.md`
- **Project Details** → See `README.md`
- **Implementation Notes** → Read `IMPLEMENTATION_NOTES.md`

---

## ✨ Features Available

✅ User Registration & Login
✅ Product Browse & Search
✅ Shopping Cart
✅ Checkout & Order
✅ Order History
✅ Admin Dashboard
✅ Admin Product Management
✅ Admin Order Management
✅ Responsive Design
✅ Form Validation

---

**Happy coding! 🚀**

Questions? Check the documentation files or look at the code comments!
