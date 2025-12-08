# Installing Node.js for Windows

Node.js is required to run the backend server. Follow these steps:

## Step 1: Download Node.js

**I've opened the Node.js download page for you.**

1. On the nodejs.org page, you'll see two versions:
   - **LTS (Recommended)** - This is what you want
   - Current - Skip this

2. Click the big green button that says **"Download Node.js (LTS)"** for Windows
   - File will be named something like: `node-v20.x.x-x64.msi`

## Step 2: Install Node.js

1. Once downloaded, **run the installer** (double-click the `.msi` file)
2. Click **"Next"** through the installer
3. **Accept the license agreement**
4. Keep all default settings (install location, features)
5. **IMPORTANT**: Make sure "Automatically install necessary tools" is checked
6. Click **"Install"**
7. Wait for installation to complete
8. Click **"Finish"**

## Step 3: Verify Installation

1. **Close and reopen** PowerShell (important!)
2. Run this command to check Node.js is installed:
   ```powershell
   node --version
   ```
   Should show something like: `v20.10.0`

3. Check npm is installed:
   ```powershell
   npm --version
   ```
   Should show something like: `10.2.3`

## Step 4: After Installation

Once Node.js is installed:
1. Close this guide
2. Let me know "Node.js installed"
3. I'll continue with setting up the backend!

---

**Expected time: 5-10 minutes**
