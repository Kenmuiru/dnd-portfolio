# Starting Your Backend Server

Now that the .env file is created, let's start the server!

## Run This Command:

**In your PowerShell terminal:**

```powershell
npm start
```

## ✅ Success Looks Like This:

You should see output similar to:

```
✅ Connected to MongoDB successfully
Created projects collection
Created categories collection with default data
Created admin collection with default user (username: admin, password: admin123)

🚀 DnD Couture API Server running on port 5000
📍 API available at: http://localhost:5000
🏥 Health check: http://localhost:5000/health

🔐 Default admin credentials:
   Username: admin
   Password: admin123

⚠️  Change the password after first login!
```

## ❌ If You See Errors:

**"MONGODB_URI is not defined"**
- Your .env file isn't being read
- Make sure the file is named exactly `.env` (with a dot at the start)
- Make sure it's in the `server` folder

**MongoDB connection errors**
- Check your connection string is correct
- Verify your MongoDB password doesn't have special characters (or is URL-encoded)
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0

**Port already in use**
- Another program is using port 5000
- Close other applications or change PORT in .env to 5001

## Next Steps:

**Once the server starts successfully:**
1. **Leave it running** (don't close the terminal)
2. Open a web browser
3. Navigate to: `http://localhost:5000/health`
4. You should see: `{"status":"OK",...}`

**Then we'll test the frontend!**
