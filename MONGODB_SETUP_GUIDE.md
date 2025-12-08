# MongoDB Atlas Setup Guide

Follow these steps exactly to set up your free MongoDB database:

## Step 1: Create MongoDB Atlas Account

**You should have the registration page open already:**

1. Click **"Sign up with Google"** (easiest option)
   - OR fill in the form manually with your details
2. If using Google: Select your Google account and authorize
3. If using manual signup: Click "Create your Atlas account"

---

## Step 2: Initial Setup Questions

After signup, MongoDB will ask some questions:

- **What is your goal today?** → Select "Learn MongoDB"
- **What is your experience level?** → Select any option
- **What is your preferred language?** → Select "JavaScript"
- Click **"Finish"**

---

## Step 3: Create FREE Cluster (This is your database)

1. You'll see "Deploy a cloud database" page
2. Look for the **M0 FREE** tier card (should say "$0.00/forever")
3. Make sure **M0** is selected (NOT M2 or M5 which cost money)
4. **Cloud Provider**: Choose any (AWS, Google Cloud, or Azure - all work fine)
5. **Region**: Choose one geographically closest to you (e.g., if in Africa, choose a nearby region)
6. **Cluster Name**: You can leave default or rename to "dnd-portfolio"
7. Click the big **"Create"** button at the bottom
8. **Wait 1-3 minutes** while MongoDB creates your cluster

---

## Step 4: Create Database User (Security Quickstart)

After cluster creation, you'll see "Security Quickstart":

### Authentication Method:
1. Keep **"Username and Password"** selected
2. **Username**: Enter `admin` (or any username you prefer)
3. **Password**: Click **"Autogenerate Secure Password"**
4. **CRITICAL**: Copy the generated password and save it somewhere safe! You'll need this.
5. Click **"Create User"**

---

## Step 5: Whitelist IP Addresses (Network Access)

Still on the Security Quickstart page:

1. Under "Where would you like to connect from?":
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"** (this allows your computer)
4. **IMPORTANT**: Also add `0.0.0.0/0` to allow Railway:
   - Click "Add Entry"
   - Enter IP: `0.0.0.0/0`
   - Description: "Allow from anywhere"
   - Click "Add Entry"
5. Click **"Finish and Close"**

---

## Step 6: Get Your Connection String

1. You'll now see your cluster dashboard
2. Click the **"Connect"** button on your cluster
3. Choose **"Drivers"** (NOT Compass or Shell)
4. Select **Driver**: "Node.js"
5. Select **Version**: Latest available
6. **Copy the connection string** shown (looks like this):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

7. **CRITICAL**: Replace `<password>` with your actual password (from Step 4)
8. **Add database name**: Insert `/dnd-portfolio` before the `?`:
   ```
   mongodb+srv://admin:your-password@cluster0.xxxxx.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
   ```

---

## ✅ Verification

Your final connection string should look like:
```
mongodb+srv://admin:YourActualPassword123@cluster0.xxxxx.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
```

**Make sure:**
- ✅ `<password>` is replaced with your actual password
- ✅ `/dnd-portfolio` is added before the `?`
- ✅ You saved this string somewhere safe

---

## What's Next?

Once you have your connection string, you'll use it to:
1. Test the backend locally
2. Deploy to Railway (production)

**Save this connection string - you'll need it in the next step!**
