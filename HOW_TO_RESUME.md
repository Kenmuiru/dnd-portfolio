# How to Resume Your DnD Portfolio Work

## ✅ What You've Accomplished So Far:

- ✅ MongoDB Atlas database set up and connected
- ✅ Node.js and npm installed
- ✅ Complete backend API server created
- ✅ Backend dependencies installed
- ✅ Environment variables configured
- ✅ Backend server tested and working locally
- ✅ Frontend tested with backend successfully
- ✅ Admin login working

## 🔄 How to Start Again (Next Time):

**You need to run TWO commands in TWO separate PowerShell terminals:**

### Terminal 1: Start Backend Server

```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
npm start
```

Wait for: `✅ Connected to MongoDB successfully` and `🚀 DnD Couture API Server running on port 5000`

### Terminal 2: Start Frontend Server

```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio
npx http-server -p 3000 -c-1
```

Wait for: `Available on: http://127.0.0.1:3000`

### Then Open in Browser:

**Admin Panel:** `http://localhost:3000/admin.html`
- Username: `admin`
- Password: `admin123` (or your new password if you changed it)

**Main Portfolio:** `http://localhost:3000/index.html`

---

## 📋 Next Steps (When You're Ready):

1. **Test Adding Projects** - Upload images and create portfolio items
2. **Change Admin Password** - Use the "Change Password" tab in admin panel
3. **Deploy to Production** - Make your site live on the internet:
   - Deploy backend to Railway.app (free)
   - Deploy frontend to Netlify (free)
   - Follow: `DEPLOYMENT_GUIDE.md`

---

## 🆘 If You Run Into Issues:

**"MongoDB connection error"**
- Your MongoDB Atlas cluster might have gone to sleep
- Just wait a minute and try again

**"Failed to fetch"**
- Make sure BOTH servers are running
- Backend on port 5000, Frontend on port 3000

**"npm not recognized"**
- Restart your PowerShell terminal

---

## 📁 Important Files:

- **Backend:** `C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server\`
- **Frontend:** `C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\`
- **Guides:** All the `*.md` files in the dnd-portfolio folder

---

**When you're ready to deploy to production, just let me know and we'll continue with Railway and Netlify!** 🚀
