# Push Your Code to GitHub

Your GitHub repository: https://github.com/Kenmuiru/dnd-portfolio

## Run These Commands in PowerShell:

```powershell
git remote add origin https://github.com/Kenmuiru/dnd-portfolio.git
git branch -M main
git push -u origin main
```

## If GitHub Asks for Authentication:

**Username**: `Kenmuiru`

**Password**: You'll need a Personal Access Token (not your GitHub password)

### To Create a Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name: `Railway Deploy`
4. Expiration: Choose `90 days` or `No expiration`
5. Check the **`repo`** scope (full control of private repositories)
6. Scroll down and click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

### Alternative: GitHub CLI (Easier)

If the above gives you trouble, install GitHub CLI:

```powershell
winget install --id GitHub.cli
```

Then authenticate:
```powershell
gh auth login
```

Choose: **GitHub.com** → **HTTPS** → **Login with a web browser**

Then retry the push.

---

**Let me know once the push succeeds (you'll see "Branch 'main' set up to track remote branch")!**
