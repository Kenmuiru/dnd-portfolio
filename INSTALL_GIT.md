# Installing Git for GitHub

Git is required to push your code to GitHub. Here's how to install it:

## Step 1: Download Git

**I've opened the Git download page for you.**

1. Click the **"Download for Windows"** button
2. The download will start automatically
3. File will be named something like: `Git-2.43.0-64-bit.exe`

## Step 2: Install Git

1. Once downloaded, **run the installer** (double-click the `.exe` file)
2. Click **"Next"** through most screens
3. **IMPORTANT SETTINGS:**
   - **Adjusting your PATH environment**: Choose "Git from the command line and also from 3rd-party software"
   - **Choosing the default editor**: Choose "Use Visual Studio Code as Git's default editor" (or Notepad)
   - **Everything else**: Keep the defaults

4. Click **"Install"** and wait for it to complete
5. Click **"Finish"**

## Step 3: Verify Installation

1. **Close and reopen PowerShell** (important!)
2. Run:
   ```powershell
   git --version
   ```
   Should show: `git version 2.43.0` (or similar)

## Step 4: Configure Git (First Time Setup)

Run these commands in PowerShell:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email you used for GitHub!

---

**Expected time: 5 minutes**

**Once Git is installed, let me know and we'll push your code to GitHub!**
