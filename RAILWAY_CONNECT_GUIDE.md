# Connecting GitHub Repository to Railway

## Step 1: Access Your Railway Project

1. Go to: https://railway.app/dashboard
2. You should see your project (the one you created earlier)
3. Click on the project to open it
4. You'll see your service (the empty service you created)

## Step 2: Connect GitHub Repository

1. Click on your service
2. In the service settings, find **"Settings"** tab
3. Look for **"Source"** or **"Connect Repo"** section
4. Click **"Connect Repo"** or **"GitHub Repo"**
5. Select **"Kenmuiru/dnd-portfolio"** from the list
6. **IMPORTANT**: Set **"Root Directory"** to `/server`
   - This tells Railway to deploy only the server folder, not the entire repository

## Step 3: Configure Build Settings

Railway should auto-detect that it's a Node.js project, but verify:

- **Build Command**: `npm install`
- **Start Command**: `npm start`  
- **Root Directory**: `/server`

## Step 4: Deploy!

1. Click **"Deploy"** or Railway will automatically start deploying
2. Wait for the build to complete (1-3 minutes)
3. Look for deployment status - should show "Active" when done

## Step 5: Get Your API URL

1. Go to **"Settings"** tab
2. Under **"Networking"** or **"Domains"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://dnd-backend-production.up.railway.app`)

**Save this URL - you'll need it for the frontend!**

## Step 6: Test Your Backend

Open browser to: `https://your-railway-url.railway.app/health`

You should see:
```json
{
  "status": "OK",
  "message": "DnD Couture API is running"
}
```

---

**If you get stuck, let me know what screen you're on and I'll help!**
