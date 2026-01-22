# YOGE'S KART - Setup Instructions

## Prerequisites

Before starting, ensure you have the following installed on your system:

### 1. Node.js & npm
- Download from: https://nodejs.org/ (LTS version recommended)
- Install using the official installer
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB Atlas (Cloud Database)
- Create account at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Allow IP 0.0.0.0/0 for development

### 3. Git (Optional but recommended)
- Download from: https://git-scm.com/

## Backend Setup

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env` file in the `backend` folder with:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yoges-kart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### Step 4: Start Backend Server
```bash
npm run dev
```

The backend will run on: http://localhost:5000

Expected output:
```
Server running on port 5000
MongoDB Connected: cluster.mongodb.net
```

## Frontend Setup

### Step 1: Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on: http://localhost:3000

Expected output:
```
VITE v4.4.5  ready in 123 ms

➜  Local:   http://localhost:3000/
```

## MongoDB Setup Guide

### Create a Cluster:
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click "Create" → "New Project"
4. Create a Cluster (M0 Free tier is sufficient)
5. Choose a region closest to you
6. Wait for cluster to be ready (2-3 minutes)

### Get Connection String:
1. Go to "Database" → Your Cluster
2. Click "Connect"
3. Choose "Drivers"
4. Copy connection string
5. Replace `<password>` with your password
6. Replace `<username>` with your username

### Example Connection String:
```
mongodb+srv://yoges:password123@cluster0.abc123.mongodb.net/yoges-kart?retryWrites=true&w=majority
```

## Test the Application

### 1. Open Browser
- Frontend: http://localhost:3000

### 2. Register a New Account
- Click "Register"
- Fill in username, email, password
- Submit

### 3. Login
- Use your credentials to login
- You should see "Hi, [username]" in navbar

### 4. Browse Products
- Click "Products"
- View all products (empty initially)

### 5. Test Admin Features
Create an admin user directly in MongoDB:

1. Go to MongoDB Atlas → Collections
2. Create database: "yoges-kart"
3. Create collection: "users"
4. Insert a document:
```json
{
  "username": "admin",
  "email": "admin@yogeskart.com",
  "password": "$2a$10$...", // bcrypt hash of "admin123"
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin",
  "isActive": true,
  "createdAt": new Date()
}
```

Or use this simpler approach - set role to "admin" for your user via MongoDB Atlas UI.

### 6. Add Products (as Admin)
- Login as admin
- Use the Admin Dashboard or API to add products
- Or use curl/Postman to POST to `/api/products`

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Check your MongoDB URI in `.env` file. Ensure whitelist IP 0.0.0.0/0 is enabled in Atlas.

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** 
```bash
# Change PORT in .env to different number (e.g., 5001)
# Or kill process using port 5000
```

### npm command not found
**Solution:** Node.js is not installed or not in PATH. Reinstall Node.js from nodejs.org

### Vite not starting
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

## Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```
Outputs to `frontend/dist/`

### Backend Production
```bash
# Ensure NODE_ENV=production in .env
npm start  # Instead of npm run dev
```

## Deployment Options

### Frontend
- Vercel (Recommended)
- Netlify
- GitHub Pages

### Backend
- Heroku (free tier available)
- Railway
- AWS EC2
- DigitalOcean

### Database
- MongoDB Atlas (free tier)

## API Testing

### Using Postman
1. Import endpoints from API_DOCUMENTATION.md
2. Set `{{base_url}}` to `http://localhost:5000/api`
3. Add token to Authorization header after login

### Using curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123","confirmPassword":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## File Structure Overview

```
YOGE'S KART/
├── backend/
│   ├── src/
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth & validation
│   │   ├── utils/           # Helpers
│   │   └── server.js        # Main server file
│   ├── package.json
│   ├── .env                 # Environment variables (CREATE THIS)
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── redux/           # State management
    │   ├── services/        # API calls
    │   ├── hooks/           # Custom hooks
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Set up MongoDB Atlas
3. ✅ Create `.env` file in backend
4. ✅ Install dependencies: `npm install` (both folders)
5. ✅ Start backend: `npm run dev`
6. ✅ Start frontend: `npm run dev`
7. ✅ Test registration and login
8. ✅ Add products (as admin)
9. ✅ Test shopping functionality

## Support & Resources

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- Redux: https://redux.js.org
- Vite: https://vitejs.dev

## Contact

For issues or questions, refer to the README.md and API_DOCUMENTATION.md files.

Good luck with your project! 🚀
