# Your Exact Commands to Push to GitHub

## Step 1: Configure Git

**Run these commands in PowerShell:**

```powershell
git config --global user.name "Ken Muiru"
git config --global user.email "kenmuiru@gmail.com"
```

**Verify it worked:**
```powershell
git config --global --list
```

---

## Step 2: Initialize Git Repository

```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio
git init
git add .
git commit -m "Initial commit - DnD Portfolio with backend"
```

---

## Step 3: Create GitHub Repository

1. Open browser to: https://github.com/new
2. Repository name: `dnd-portfolio`
3. Description: "DnD Couture Portfolio Website"
4. Make it **Public**
5. **DO NOT** check any boxes (no README, no .gitignore, nothing)
6. Click **"Create repository"**

---

##Step 4: Get Your GitHub Username

After creating the repo, GitHub will show a URL like:
```
https://github.com/YOUR-USERNAME/dnd-portfolio.git
```

**Copy YOUR-USERNAME** (it's in the URL)

---

## Step 5: Push to GitHub

**Replace YOUR-USERNAME in this command:**

```powershell
git remote add origin https://github.com/YOUR-USERNAME/dnd-portfolio.git
git branch -M main
git push -u origin main
```

**If it asks for authentication:**
- Username: your GitHub username
- Password: use a Personal Access Token (not your GitHub password)

**To create a token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Railway Deploy"
4. Check "repo" scope
5. Click "Generate token"
6. Copy the token and use it as the password

---

## Step 6: Connect to Railway

Once code is pushed:

1. Go to Railway dashboard
2. Click on your service
3. Go to **Settings** → **Source**
4. Click **"Connect Repo"**
5. Select `dnd-portfolio`
6. Set **Root Directory** to `/server`
7. Click **"Deploy"**

Railway will automatically build and deploy!

---

**Start with Step 1 and let me know when you've completed each step!**
