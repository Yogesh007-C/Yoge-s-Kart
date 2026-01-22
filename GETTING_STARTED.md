# 🚀 YOGE'S KART - Getting Started (Step-by-Step)

## ✅ What You Need

Before starting, ensure you have:
1. Windows/Mac/Linux computer
2. Internet connection
3. 500MB free disk space
4. A text editor or IDE (VS Code recommended)

---

## 📥 Step 1: Install Node.js (Do This First!)

### Windows
1. Go to https://nodejs.org/
2. Download "LTS" version
3. Run the installer
4. Click "Next" multiple times (default settings are fine)
5. Click "Install"
6. Restart your computer

### macOS
```bash
# Using Homebrew (if installed)
brew install node

# Or download from nodejs.org
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### Verify Installation
Open Terminal/PowerShell and type:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.1
9.8.1
```

---

## 🗄️ Step 2: Set Up MongoDB Atlas

### Create Free Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" or "Sign In"
3. Create account or login
4. Click "Create" → "New Project"
5. Name it "YOGE-KART"
6. Click "Create Project"
7. Click "Create" → "Database"
8. Choose "M0 Free" tier
9. Select your closest region
10. Click "Create"
11. Wait 2-3 minutes for cluster creation

### Get Connection String
1. Go to "Database" section
2. Click your cluster name
3. Click "Connect"
4. Click "Drivers"
5. Copy the connection string

Example:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/yoges-kart?retryWrites=true&w=majority
```

### Whitelist IP (Important!)
1. Go to "Network Access"
2. Click "Add IP Address"
3. Enter `0.0.0.0/0` (for development)
4. Click "Confirm"

---

## 📂 Step 3: Open Project in VS Code

1. Download VS Code from https://code.visualstudio.com/
2. Install and open it
3. Click "File" → "Open Folder"
4. Select the `C:\Users\manim\yk` folder (or your project folder)
5. Click "Open"

---

## ⚙️ Step 4: Backend Setup

### Terminal 1: Navigate to Backend
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```
Wait for all packages to install (2-3 minutes)

### Create .env File
1. In VS Code, right-click on `backend` folder
2. Click "New File"
3. Name it `.env` (exactly, with the dot)
4. Copy this content:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/yoges-kart?retryWrites=true&w=majority
JWT_SECRET=yoges_kart_super_secret_key_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

**Replace the URI with your MongoDB connection string!**

### Start Backend Server
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: cluster0.abc123.mongodb.net
```

✅ Backend is ready!

---

## 🎨 Step 5: Frontend Setup

### Terminal 2: Open New Terminal
1. Click the `+` icon in VS Code terminal
2. Select "PowerShell" or "Command Prompt"

### Navigate to Frontend
```bash
cd frontend
```

### Install Dependencies
```bash
npm install
```
Wait for packages to install

### Start Frontend Server
```bash
npm run dev
```

You should see:
```
VITE v4.4.5  ready in 234 ms

➜  Local:   http://localhost:3000/
```

✅ Frontend is ready!

---

## 🌐 Step 6: Open Application

### In Your Browser
1. Go to http://localhost:3000
2. You should see the YOGE'S KART website
3. Click "Register" to create an account

---

## ✍️ Step 7: Test the Application

### Register New Account
1. Click "Register"
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Register"
4. You should be logged in!

### Make Yourself Admin (Optional)
To become an admin for testing:

1. Go to MongoDB Atlas
2. Click "Collections" on your cluster
3. Click "yoges-kart" database
4. Click "users" collection
5. Find your user document
6. Click the edit icon (pencil)
7. Change `"role": "customer"` to `"role": "admin"`
8. Click "Update"
9. Refresh the website
10. You should see "Admin" link in navbar

---

## 🛍️ Step 8: Test Features

### As Admin:
1. Click "Admin" in navbar
2. Click "Manage Products"
3. Add a product:
   ```
   Name: Test Product
   Description: This is a test product
   Price: 99.99
   Category: Electronics
   SKU: TEST-001
   Stock: 50
   ```
4. Click "Add Product"

### As Customer:
1. Change your role back to `customer` in MongoDB
2. Refresh the page
3. Click "Products"
4. You should see your product
5. Click "View Details"
6. Click "Add to Cart"
7. Click "Cart"
8. You should see the product in cart
9. Click "Proceed to Checkout"
10. Fill in address details
11. Click "Place Order"
12. You should see "Order placed successfully!"

---

## 📱 Browser DevTools

### Check if APIs are working:
1. Press F12 to open Developer Tools
2. Go to "Network" tab
3. Try registering
4. You should see API calls to `localhost:5000/api/...`
5. Check if responses are successful (200, 201 status codes)

---

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution**: Node.js not installed
- Download from nodejs.org
- Restart terminal after installation

### Problem: "Cannot connect to MongoDB"
**Solution**: Check MongoDB URI
- Verify URI in `.env` file
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- Check internet connection

### Problem: "Port 5000 already in use"
**Solution**: Change port
- Edit `backend/.env`
- Change `PORT=5000` to `PORT=5001`
- Restart backend server

### Problem: "Port 3000 already in use"
**Solution**: Kill process
- Windows: `netstat -ano | findstr :3000`
- Then: `taskkill /PID <PID> /F`

### Problem: "Blank page on localhost:3000"
**Solution**: Wait and refresh
- Vite takes 10-15 seconds to start
- Press F5 to refresh browser
- Check console for errors (F12)

### Problem: "404 on API calls"
**Solution**: Backend might not be running
- Check Terminal 1
- Should see "Server running on port 5000"
- Restart backend: `npm run dev`

---

## 🔄 Daily Workflow

Every time you want to work:

### Terminal 1 (Backend)
```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
```

### Browser
```
http://localhost:3000
```

---

## 📚 File Locations

| Item | Location |
|------|----------|
| Backend Code | `C:\Users\manim\yk\backend\src\` |
| Frontend Code | `C:\Users\manim\yk\frontend\src\` |
| Configuration | `backend\.env` (create this) |
| Documentation | `C:\Users\manim\yk\*.md` |

---

## 💡 Tips

- **Keep 2 terminals open** - One for backend, one for frontend
- **Save files** - Code changes auto-refresh in browser
- **Check console** - Browser F12 shows errors
- **Check network** - See actual API calls and responses
- **Restart if needed** - Stop (Ctrl+C) and run `npm run dev` again

---

## 🎯 What to Do Next

After everything is working:

1. ✅ Explore the codebase
2. ✅ Add more products
3. ✅ Place orders
4. ✅ Test all features
5. ✅ Read documentation
6. ✅ Make customizations
7. ✅ Deploy to production (optional)

---

## 📖 Documentation

Read these files for more info:

1. `README.md` - Overview
2. `QUICK_START.md` - Quick reference
3. `API_DOCUMENTATION.md` - API endpoints
4. `SETUP_GUIDE.md` - Detailed setup
5. `ARCHITECTURE_OVERVIEW.md` - System design
6. `IMPLEMENTATION_NOTES.md` - Technical details
7. `PROJECT_SUMMARY.md` - Complete summary

---

## ✅ Checklist

- [ ] Node.js installed and verified
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string obtained
- [ ] `.env` file created in backend folder
- [ ] `npm install` completed in both folders
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Accessed http://localhost:3000 in browser
- [ ] Registered test account
- [ ] Viewed products page
- [ ] Tested add to cart
- [ ] Completed test order

---

## 🎉 You're All Set!

Your YOGE'S KART e-commerce platform is now running! 

### Remember:
- 📂 Keep both terminal windows open
- 🔄 Code changes auto-reload
- 🐛 Check browser console for errors (F12)
- 📞 Refer to documentation if stuck
- 💾 Save files to see changes

---

## 🚀 Ready?

```
Terminal 1: npm run dev (backend folder)
Terminal 2: npm run dev (frontend folder)
Browser: http://localhost:3000

✅ Start coding!
```

**Happy developing! 🎉**
