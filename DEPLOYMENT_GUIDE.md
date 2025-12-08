# DnD Couture Backend & Deployment Guide

## 🚀 Quick Start Guide

This guide will help you deploy your DnD Couture portfolio website with a backend to production.

---

## Part 1: Setting Up MongoDB Database (5 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a **free account** (no credit card required)
3. Choose **M0 Free** tier when creating your cluster
4. Select a cloud provider and region (choose one closest to your users)
5. Name your cluster (e.g., "dnd-portfolio")

### Step 2: Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select **Node.js** as driver and latest version
4. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
5. **Replace** `<password>` with your actual database password
6. **Add** your database name before the `?` (e.g., `...mongodb.net/dnd-portfolio?retryWrites...`)

### Step 3: Whitelist Your IP

1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add specific IPs)
4. Confirm

---

## Part 2: Deploying the Backend to Railway (10 minutes)

### Step 1: Install Railway CLI (Optional)

```bash
npm install -g @railway/cli
```

Or use the Railway web dashboard (easier).

### Step 2: Deploy via Railway Dashboard

1. Go to [Railway.app](https://railway.app) and sign up (free tier available)
2. Click "New Project" → "Deploy from GitHub repo" or "Empty Project"
3. If using GitHub:
   - Connect your GitHub account
   - Push your `dnd-portfolio` folder to a GitHub repo
   - Select the repository
4. If using Empty Project:
   - You'll deploy manually (see below)

### Step 3: Configure Railway Project

1. In your Railway project, click "New" → "Empty Service"
2. Name it "dnd-backend"
3. Go to "Settings" → "Environment Variables"
4. Add these variables:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-random-string-here-change-this
FRONTEND_URL=*
ADMIN_USERNAME=admin
```

> ⚠️ **IMPORTANT**: Change `JWT_SECRET` to a random string. Use this command to generate one:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### Step 4: Deploy Your Code

**Option A: Via GitHub (Recommended)**
1. Push your `server` folder to GitHub
2. Railway will auto-deploy on every push

**Option B: Via Railway CLI**
```bash
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
railway login
railway link
railway up
```

**Option C: Manual Upload**
1. Install dependencies locally first:
   ```bash
   cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
   npm install
   ```
2. Use Railway's "Deploy" button and select your folder

### Step 5: Get Your Backend URL

1. In Railway, go to your service "Settings"
2. Click "Generate Domain" under "Public Networking"
3. Copy the URL (e.g., `https://dnd-backend-production.up.railway.app`)

---

## Part 3: Deploying Frontend to Netlify (5 minutes)

### Step 1: Update Frontend Configuration

1. Open `C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\js\config.js`
2. Update the production API URL:

```javascript
BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://your-railway-url.up.railway.app/api', // <- Change this
```

Replace `your-railway-url.up.railway.app` with your actual Railway URL.

### Step 2: Deploy to Netlify

1. Go to [Netlify.com](https://www.netlify.com/) and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your **ENTIRE** `dnd-portfolio` folder (not just the server folder)
4. Wait for deployment to complete
5. Your site will be live at `https://random-name.netlify.app`

### Step 3: Custom Domain (Optional)

1. In Netlify, go to "Site settings" → "Change site name"
2. Choose a custom subdomain (e.g., `dnd-couture.netlify.app`)

---

## Part 4: Testing Your Live Site

### 1. Visit Your Site

Open your Netlify URL in a browser.

### 2. Test Portfolio Loading

- The homepage should load
- Projects should display from the database
- Filters should work

### 3. Test Admin Login

1. Go to `https://your-site.netlify.app/admin.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. **IMPORTANT**: Immediately change your password!

### 4. Test Adding a Project

1. In the admin panel, go to "Add Project"
2. Upload an image
3. Fill in details
4. Submit
5. Verify the project appears on the homepage

---

## Part 5: Migrating Existing Data (Optional)

If you have existing projects in localStorage:

### Step 1: Export LocalStorage Data

Open browser console on your current site and run:

```javascript
const projects = JSON.parse(localStorage.getItem('dnd_projects'));
const categories = JSON.parse(localStorage.getItem('dnd_categories'));
console.log(JSON.stringify({projects, categories}, null, 2));
```

Copy the output.

### Step 2: Manual Migration

For each project, manually add it through the admin panel on your live site, uploading the images.

**OR**

Use the MongoDB Compass tool to directly import the JSON data into your database.

---

## Troubleshooting

### Backend Not Connecting to Database

- Check MongoDB Atlas → Network Access (IP whitelist)
- Verify connection string in Railway environment variables
- Check Railway logs for errors

### Frontend Can't Reach Backend

- Verify Railway URL is correct in `config.js`
- Check Railway service is running
- Open browser console (F12) and check for CORS errors

### Images Not Displaying

- Images uploaded through the admin panel are stored on Railway
- Old images in your `Images` folder won't show until re-uploaded

---

## Environment Variables Summary

### Backend (Railway)

| Variable | Example | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@...` | MongoDB connection string |
| `PORT` | `5000` | Server port (Railway auto-assigns) |
| `NODE_ENV` | `production` | Environment mode |
| `JWT_SECRET` | `abc123xyz...` | Secret for JWT tokens |
| `FRONTEND_URL` | `*` | CORS allowed origins |

### Frontend (config.js)

Update the production URL in `js/config.js` to point to your Railway backend.

---

## 📞 Need Help?

If you encounter issues:

1. Check Railway logs: `railway logs`
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB cluster is running

---

## 🎉 Success!

Once everything is working:

1. ✅ Change your admin password
2. ✅ Upload all your project images
3. ✅ Share your Netlify URL with the world!

Your portfolio is now live with a professional backend! 🚀
