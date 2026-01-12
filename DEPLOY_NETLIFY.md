# Deploying Frontend to Netlify

Your frontend is now configured with the Railway backend URL!

## Step 1: Commit the Config Change

**Run these commands in PowerShell:**

```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio
git add js/config.js
git commit -m "Update config with production Railway API URL"
git push
```

## Step 2: Deploy to Netlify

**OPTION A: Netlify Drop (Easiest - Recommended)**

1. Go to: **https://app.netlify.com/drop**
2. Sign up/Login with GitHub
3. **Drag and drop your entire `dnd-portfolio` folder** into the drop zone
4. Netlify will automatically deploy
5. You'll get a URL like: `https://random-name-12345.netlify.app`
6. Done!

**OPTION B: Connect GitHub Repo (More Professional)**

1. Go to: **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"**
4. Select **"Kenmuiru/dnd-portfolio"** repository
5. **Build settings**:
   - Build command: (leave empty)
   - Publish directory: `.` (or leave empty for root)
6. Click **"Deploy site"**

## After Deployment

You'll get a Netlify URL. Test your site:

1. Visit the URL
2. Click "Admin" button
3. Login with: `admin` / `admin123`
4. Try adding a project!

Everything should work with your Railway backend!

---

**Choose Option A or B and let me know when your site is live!**
