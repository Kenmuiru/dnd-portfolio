# Getting Your Railway Backend URL

Your backend is now deployed on Railway! Now we need the URL to connect the frontend.

## Steps to Get Your Railway URL:

1. **In Railway dashboard**, click on your service
2. Go to the **"Settings"** tab
3. Scroll to **"Networking"** or **"Domains"** section
4. You should see a **"Generate Domain"** button
5. Click it to get a public URL
6. **Copy the full URL** - it will look like:
   ```
   https://dnd-portfolio-production-xxxx.up.railway.app
   ```

## Test Your Backend

Once you have the URL, test it in your browser:

```
https://your-railway-url.railway.app/health
```

**You should see:**
```json
{
  "status": "OK",
  "message": "DnD Couture API is running",
  "timestamp": "2025-12-08T..."
}
```

If you see this, your backend is live and working! ✅

## Next Steps

Once you share the URL with me, I'll:
1. Update `js/config.js` with your production backend URL
2. Deploy the frontend to Netlify
3. Test the complete live site

**Share your Railway backend URL!**
