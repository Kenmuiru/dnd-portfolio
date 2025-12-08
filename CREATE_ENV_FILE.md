# Creating Your .env File

You need to create a file called `.env` in the `server` folder with your MongoDB connection string.

## Step 1: Create the File

**In VS Code:**

1. Look at the left sidebar (Explorer panel)
2. Navigate to: `dnd-portfolio` → `server` folder
3. **Right-click** on the `server` folder
4. Select **"New File"**
5. Name it exactly: `.env` (including the dot at the beginning!)

## Step 2: Add Your Configuration

**Paste this into the `.env` file:**

```
MONGODB_URI=PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE
PORT=5000
NODE_ENV=development
JWT_SECRET=dnd-couture-secret-key-2025-change-in-production
FRONTEND_URL=*
ADMIN_USERNAME=admin
```

## Step 3: Add Your MongoDB Connection String

**IMPORTANT:** Replace `PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE` with your actual MongoDB connection string from MongoDB Atlas.

**Your connection string should look like:**
```
mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
```

**Remember:**
- ✅ Replace `<password>` with your actual MongoDB password
- ✅ Make sure `/dnd-portfolio` is before the `?`
- ✅ No spaces or line breaks in the connection string

## Step 4: Save the File

Press **`Ctrl + S`** to save

---

## Example .env File:

```
MONGODB_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=dnd-couture-secret-key-2025-change-in-production
FRONTEND_URL=*
ADMIN_USERNAME=admin
```

**Once you've created and saved the `.env` file, let me know and I'll start the server!**
