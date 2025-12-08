# Troubleshooting "Failed to Fetch" Error

The admin login couldn't connect to the backend. Let's fix this.

## Step 1: Check if Backend Server is Still Running

Look at your PowerShell terminal where you ran `npm start`.

**Is it still showing these messages?**
```
✅ Connected to MongoDB successfully
🚀 DnD Couture API Server running on port 5000
```

**If NO (server stopped/crashed):**
Restart it:
```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
npm start
```

## Step 2: Test API Directly

Open a new browser tab and navigate to:
```
http://localhost:5000/health
```

**Expected Result:**
```json
{
  "status": "OK",
  "message": "DnD Couture API is running",
  "timestamp": "2025-12-06T..."
}
```

**If you see this** ✅ - Backend is working!

**If you see "can't reach this page"** ❌ - Backend not accessible

## Step 3: Common Issues

**Issue: Port 5000 is blocked**
- Try changing PORT in `.env` to `5001`
- Restart server with `npm start`
- Update `js/config.js` to use port 5001

**Issue: CORS error**
- This is already handled in the backend
- Check browser console (F12) for actual error

**Issue: Wrong API URL**
- Check `js/config.js` has `http://localhost:5000/api` for local development

## Step 4: After Fixing

1. Restart backend server if needed
2. Refresh the admin login page (F5)
3. Try logging in again with: `admin` / `admin123`

**Let me know what you see when you visit http://localhost:5000/health**
