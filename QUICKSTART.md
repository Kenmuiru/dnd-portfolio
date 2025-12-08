# Quick Start - Local Testing

## Prerequisites
- Node.js installed (check with `node --version`)
- Text editor to create `.env` file

## Steps to Run Locally

### 1. Set Up Backend

Open PowerShell and run:

```powershell
cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
npm install
```

### 2. Create Environment File

Create a file called `.env` in the `server` folder with this content:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/dnd-portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=my-super-secret-key-change-this-later
FRONTEND_URL=*
ADMIN_USERNAME=admin
```

**Replace the MONGODB_URI** with your actual MongoDB Atlas connection string.

### 3. Start the Backend

```powershell
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 DnD Couture API Server running on port 5000
```

### 4. Open the Frontend

Open `index.html` in your browser. The site will automatically connect to `http://localhost:5000/api`.

### 5. Test Admin Login

1. Go to `admin.html`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Try adding a project!

## Troubleshooting

**"Failed to load projects"**
- Make sure backend is running on port 5000
- Check browser console (F12) for errors

**"MongoDB connection error"**
- Verify your MongoDB Atlas connection string
- Check that your IP is whitelisted in MongoDB Atlas

**"Authentication failed"**
- Default credentials are `admin` / `admin123`
- Clear browser storage and try again

## Next Steps

Once local testing works, follow `DEPLOYMENT_GUIDE.md` to deploy to production!
