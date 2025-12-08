# Testing Admin Features Locally

Follow these steps to test your admin panel:

## Step 1: Start Both Servers

**Terminal 1 - Backend Server:**
```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
npm start
```

Wait for: `✅ Connected to MongoDB successfully` and `🚀 DnD Couture API Server running on port 5000`

**Terminal 2 - Frontend Server:**
```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio
npx http-server -p 3000 -c-1
```

Wait for: `Available on: http://127.0.0.1:3000`

---

## Step 2: Login to Admin Panel

1. Open browser to: **`http://localhost:3000/admin.html`**
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You should be redirected to the portfolio page
4. Click the **"Admin"** button in the navigation

---

## Step 3: Test Adding a Project

1. In the Admin Panel, click **"Add Project"** tab
2. Click **"Choose File"** and select an image from your computer
3. Fill in:
   - **Title**: e.g., "Test Project"
   - **Description**: e.g., "Testing the admin panel"
   - **Category**: Choose any category (e.g., "Casual")
4. Click **"Add Project"**
5. You should see a success message
6. Close the admin panel and check if the project appears on the main portfolio page

---

## Step 4: Test Deleting a Project

1. Open Admin Panel again
2. Click **"Manage Projects"** tab
3. Find your test project
4. Click **"Delete"** button
5. Confirm the deletion
6. The project should be removed

---

## Step 5: Test Adding/Deleting Categories

1. Click **"Manage Categories"** tab
2. Add a new category (e.g., "Test Category")
3. It should appear in the categories list
4. Delete it by clicking the delete button

---

## What to Test:

- ✅ Images upload correctly
- ✅ Projects appear on the main portfolio
- ✅ Filters work with new categories
- ✅ Delete removes projects from both admin and portfolio
- ✅ Image files are properly uploaded to the server

---

## Troubleshooting:

**"Failed to fetch"**
- Make sure both servers are running
- Check backend shows no errors

**Image doesn't display**
- The image uploads to the server's `uploads` folder
- Check the browser console (F12) for any errors

**Changes don't appear**
- Refresh the page (F5)
- Check the admin panel shows the changes

---

**Once you've tested everything and it works, we can proceed to deploy to production!**
