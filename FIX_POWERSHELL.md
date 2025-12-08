# Fix: PowerShell Scripts Disabled

This is a Windows security setting that needs to be changed to run npm.

## Quick Fix (Run This Command):

**In your PowerShell terminal, run this command:**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**When it asks "Do you want to change the execution policy?":**
- Type **`Y`** (for Yes)
- Press **Enter**

## What This Does:
- Allows you to run scripts that you create locally (safe)
- Still blocks untrusted scripts from the internet (security maintained)

## After Running the Command:

Try npm again:
```powershell
npm --version
```

You should now see a version number like `10.2.3`!

---

## Alternative: If you get "Access Denied"

If the command doesn't work, you need to run PowerShell as Administrator:

1. Close VS Code
2. Press **Windows Key**
3. Type **"PowerShell"**
4. **Right-click** on "Windows PowerShell"
5. Select **"Run as administrator"**
6. Run the same command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
7. Type **`Y`** and press Enter
8. Close PowerShell
9. Reopen VS Code
10. Try `npm --version` again

**Let me know once npm works!**
