# Deploying Backend to Railway - Step-by-Step

## Part 1: Create Railway Account & Project

### Step 1: Sign Up for Railway

**On the Railway.app page that's open:**

1. Click **"Login"** or **"Sign in"** button
2. Choose **"Login with GitHub"** (easiest option)
   - OR use email if you prefer
3. Authorize Railway to access your GitHub account
4. Complete the signup process

### Step 2: Create New Project

1. Once logged in, you'll see the Railway dashboard
2. Click **"New Project"** button
3. Choose **"Deploy from GitHub repo"** 
   - If you haven't pushed your code to GitHub yet, choose **"Empty Project"** instead (we'll upload manually)

### Step 3: Add a Service

1. Click **"+ New"** button
2. Select **"Empty Service"**
3. Name it: `dnd-backend` or `dnd-portfolio-api`

---

## Part 2: Configure Environment Variables

### Step 4: Add Your Environment Variables

1. Click on your service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add each of these:

```
MONGODB_URI=<your-mongodb-connection-string-from-atlas>
PORT=5000
NODE_ENV=production
JWT_SECRET=<generate-a-new-secret-key>
FRONTEND_URL=*
ADMIN_USERNAME=admin
```

**IMPORTANT:**
- Copy your MongoDB connection string from MongoDB Atlas
- Generate a NEW JWT_SECRET (run this in PowerShell):
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

---

## Part 3: Deploy Your Code

### Option A: Deploy from GitHub (Recommended)

1. Push your `server` folder to a GitHub repository
2. In Railway, connect the repository
3. Set **Source Directory** to `/server`
4. Railway will automatically deploy

### Option B: Deploy via Railway CLI

1. Install Railway CLI:
   ```powershell
   npm install -g @railway/cli
   ```

2. Login:
   ```powershell
   railway login
   ```

3. Navigate to server folder:
   ```powershell
   cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
   ```

4. Link to your project:
   ```powershell
   railway link
   ```

5. Deploy:
   ```powershell
   railway up
   ```

---

## Part 4: Get Your API URL

1. Go back to Railway dashboard
2. Click on your service
3. Go to **"Settings"** tab
4. Under **"Networking"**, click **"Generate Domain"**
5. Copy the URL (e.g., `https://dnd-backend-production.up.railway.app`)

**Save this URL - you'll need it for the frontend!**

---

## Verification

Once deployed, test your API:

Open browser to: `https://your-railway-url.railway.app/health`

You should see:
```json
{
  "status": "OK",
  "message": "DnD Couture API is running"
}
```

---

**Once your backend is deployed and working, we'll deploy the frontend to Netlify and connect them!**
