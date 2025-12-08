# Git Not Recognized - Quick Fix

Git is installed but PowerShell hasn't loaded it into the PATH yet.

## Solution: Restart PowerShell Terminal

**In VS Code:**

1. Look at the bottom panel where the terminal is
2. Click the **trash can icon (🗑️)** next to the terminal
3. This closes the current terminal
4. Open a new one: `Terminal` menu → `New Terminal`
5. Run:
   ```powershell
   git --version
   ```

You should now see: `git version 2.43.0` (or similar)

## Configure Git

After Git is recognized, configure it with your details:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Important:** Use the same email address as your GitHub account!

## Verify Configuration

```powershell
git config --global --list
```

This will show your name and email.

---

**Once this is done, we can push your code to GitHub!**
