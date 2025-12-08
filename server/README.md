# DnD Couture Portfolio - Complete Backend System

## 📁 Project Structure

```
dnd-portfolio/
├── server/                  # Backend API
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── routes/
│   │   ├── auth.js         # Login & password changes
│   │   ├── projects.js     # Project CRUD + uploads
│   │   └── categories.js   # Category management
│   ├── package.json
│   ├── server.js           # Main Express app
│   ├── .env.example        # Environment variables template
│   └── .gitignore
├── js/
│   ├── config.js           # API configuration
│   ├── app.js              # Frontend app (uses API)
│   └── data.js             # Initial data fallback
├── css/
│   └── style.css
├── Images/                  # Static images
├── uploads/                 # User-uploaded images (server)
├── index.html
├── admin.html
├── DEPLOYMENT_GUIDE.md     # Complete deployment instructions
└── README.txt

## 🔧 Local Development Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier)

### Steps

1. **Set up backend:**

   ```bash
   cd C:\Users\User\.gemini\antigravity\scratch\dnd-portfolio\server
   npm install
   ```

2. **Create environment file:**

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   copy .env.example .env
   ```

   Edit `.env` with your MongoDB connection string.

3. **Start backend server:**

   ```bash
   npm start
   ```

   Server will run on http://localhost:5000

4. **Open frontend:**

   Open `index.html` in your browser. It will automatically connect to localhost:5000 API.

5. **Login to admin:**

   Go to `admin.html` and login with:
   - Username: `admin`
   - Password: `admin123`

---

## 🚀 Production Deployment

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.

**Summary:**
1. Deploy backend to Railway.app (free tier)
2. Deploy frontend to Netlify (free tier)
3. Update `js/config.js` with production API URL

---

## 🔐 Security Notes

- **Change default password** immediately after first login
- **Never commit** `.env` file to git
- **Use strong JWT_SECRET** in production (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

---

## 📝 API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/categories` - Get all categories

### Protected Endpoints (require JWT token)

- `POST /api/auth/login` - Login admin
- `POST /api/auth/change-password` - Change password
- `POST /api/projects` - Add new project (with image upload)
- `DELETE /api/projects/:id` - Delete project
- `POST /api/categories` - Add category
- `DELETE /api/categories/:slug` - Delete category

---

## 🖼️ Image Handling

- **Old system:** Images stored in `Images/` folder, managed via localStorage
- **New system:** Images uploaded to server via multipart/form-data, stored in `uploads/` folder
- **File size limit:** 10MB per image
- **Accepted formats:** JPEG, PNG, GIF, WebP

---

## 🛠️ Technologies Used

**Backend:**
- Node.js + Express
- MongoDB (via MongoDB driver)
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

**Frontend:**
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests
- Custom notification system

---

## 📊 Database Schema

### Collections

**projects:**
```json
{
  "id": 1234567890,
  "title": "Project Title",
  "description": "Project description",
  "category": "category-slug",
  "image": "/uploads/image.jpg",
  "createdAt": "2025-12-06T...",
  "updatedAt": "2025-12-06T..."
}
```

**categories:**
```json
{
  "slug": "category-name",
  "name": "Category Name",
  "createdAt": "2025-12-06T..."
}
```

**admin:**
```json
{
  "username": "admin",
  "password": "hashed_password",
  "createdAt": "2025-12-06T...",
  "updatedAt": "2025-12-06T..."
}
```

---

## 💡 Tips

1. **Development:** Backend runs on port 5000, frontend uses any file server
2. **CORS:** Already configured to accept requests from any origin (can be restricted in production)
3. **File uploads:** Images are automatically saved to `uploads/` folder with timestamped filenames
4. **Authentication:** JWT tokens expire after 24 hours
5. **Error handling:** All API errors return JSON with `{error: "message"}` format

---

## 🐛 Common Issues

**"Database not connected"**
- Check MongoDB Atlas connection string
- Verify IP whitelist includes your server's IP

**"Authentication failed"**
- Clear browser storage and login again
- Check JWT_SECRET matches between client and server

**"Image upload failed"**
- Ensure `uploads` folder exists and is writable
- Check file size is under 10MB
- Verify file format is supported

---

## 📢 Updates from localStorage Version

### What Changed:

1. **Data Persistence:** 
   - OLD: Saved to browser localStorage
   - NEW: Saved to MongoDB database

2. **Image Uploads:**
   - OLD: Manual copy to Images folder
   - NEW: Uploaded directly to server

3. **Authentication:**
   - OLD: Client-side password check (insecure)
   - NEW: Server-side JWT authentication

4. **API Integration:**
   - OLD: Direct localStorage manipulation
   - NEW: RESTful API calls with fetch

### Migration Required:

If you have existing projects in localStorage, you'll need to manually re-add them through the admin panel after deployment.

---

## 📍 Next Steps

1. Follow `DEPLOYMENT_GUIDE.md` to deploy to production
2. Change admin password after first login
3. Upload your portfolio images
4. Share your live site!

---

**Questions?** Check the troubleshooting section in `DEPLOYMENT_GUIDE.md`
