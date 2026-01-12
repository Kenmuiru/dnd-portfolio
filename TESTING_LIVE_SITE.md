# Testing Your Live Portfolio - Complete Checklist

## Step 1: Test Backend API (Railway)

**Open your browser and visit:**
```
https://accomplished-beauty-production.up.railway.app/health
```

**✅ Success looks like:**
```json
{
  "status": "OK",
  "message": "DnD Couture API is running",
  "timestamp": "2025-12-08T..."
}
```

**❌ If you see an error:**
- Check Railway dashboard - is your service running?
- Check the "Deployments" tab for errors
- Look at the logs

---

## Step 2: Find Your Netlify URL

1. Go to: **https://app.netlify.com/**
2. Click on your deployed site
3. You'll see a URL like: `https://random-name-12345.netlify.app`
4. **Copy this URL**

---

## Step 3: Test Frontend (Main Portfolio Page)

**Visit your Netlify URL in browser**

**✅ Success checklist:**
- [ ] Page loads without errors
- [ ] You see the DnD Couture branding/header
- [ ] Category filters appear (All, Bridal, Casual, etc.)
- [ ] Projects load (might be empty if you haven't added any yet)
- [ ] No error messages in the page

**❌ If page loads but shows errors:**
- Press F12 to open browser console
- Look for red error messages
- Common issue: "Failed to load projects" means frontend can't reach backend

---

## Step 4: Test Admin Login

**On your Netlify site, click the "Admin" button**

1. You should be redirected to `your-netlify-url.netlify.app/admin.html`
2. **Enter credentials:**
   - Username: `admin`
   - Password: `admin123`
3. Click **"Login"**

**✅ Success:**
- You're redirected back to the main page
- Admin button is now visible
- You can click Admin to open the admin panel

**❌ If login fails:**
- Check browser console (F12) for errors
- Error might say "Failed to fetch" - means backend not reachable
- Try visiting the /health endpoint again

---

## Step 5: Test Adding a Project

1. **Click the "Admin" button** on your live site
2. Go to **"Add Project"** tab
3. **Fill in:**
   - Choose an image file
   - Title: "Test Project"
   - Description: "Testing live deployment"
   - Category: Choose any (e.g., "Casual")
4. Click **"Add Project"**

**✅ Success:**
- Success message appears
- Project appears in the portfolio grid
- Image displays correctly

**❌ If it fails:**
- Check error message
- "Failed to upload" = backend issue
- Image not displaying = upload path issue

---

## Step 6: Test Project Display

1. **Close the admin panel**
2. **Refresh the main page**
3. Your test project should appear in the portfolio grid
4. Click on it to open the lightbox
5. Image should display in full size

---

## Step 7: Test Filters

1. Click different category filters (All, Bridal, Casual, etc.)
2. Projects should filter correctly
3. "All" should show everything

---

## Common Issues & Solutions

### "Failed to load projects"
- **Problem**: Frontend can't reach backend
- **Check**: Is backend health endpoint working?
- **Fix**: Verify Railway backend URL in `js/config.js`

### "Network error" or "CORS error"
- **Problem**: Backend not allowing requests from Netlify domain
- **Check**: Railway backend CORS settings
- **Fix**: Backend should have `FRONTEND_URL=*` in environment variables

### Images not displaying
- **Problem**: Image upload path incorrect
- **Check**: Railway logs for upload errors
- **Fix**: Make sure Railway has write permissions for uploads

### Login keeps failing
- **Problem**: Backend authentication not working
- **Check**: Railway logs for auth errors
- **Fix**: Verify JWT_SECRET is set in Railway env variables

---

## Quick Test Summary

Run through these quickly:

1. ✅ Backend health: `https://accomplished-beauty-production.up.railway.app/health`
2. ✅ Frontend loads: Visit your Netlify URL
3. ✅ Admin login works: Login with admin/admin123
4. ✅ Add a test project: Upload image and create project
5. ✅ Project displays: See it in the portfolio grid

**If all 5 work, your site is LIVE and WORKING! 🎉**

---

## Your URLs:

- **Backend (Railway)**: https://accomplished-beauty-production.up.railway.app
- **Frontend (Netlify)**: [YOUR NETLIFY URL HERE]

**Share your Netlify URL once you know what it is!**
