# PowerShell Restart Required

Node.js is installed, but your current PowerShell window doesn't recognize it yet.

## Quick Fix:

**In VS Code:**

1. Look at the bottom panel where the terminal is
2. Click the **trash can icon (🗑️)** to close the current terminal
3. Open a new terminal: Menu → `Terminal` → `New Terminal`
4. Test npm works by typing:
   ```powershell
   npm --version
   ```
5. You should see a version number like `10.2.3`

**Once npm works, I can continue with the backend setup!**

---

## Alternative (if VS Code terminal doesn't work):

1. Close VS Code completely
2. Reopen VS Code
3. Open new terminal
4. Try `npm --version` again
