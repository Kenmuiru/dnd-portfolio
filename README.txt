DnD Couture Website - Customization Guide
=========================================

This guide explains how to customize your website's images and colors.

1. HOW TO CHANGE BACKGROUND IMAGES
----------------------------------
All background images are controlled in the "css/style.css" file.

Step A: Prepare your image
   - Copy your new image into the "Images" folder.
   - Remember the exact filename (e.g., "new-background.jpg").

Step B: Update the code
   - Open the file "css/style.css" in a text editor (like Notepad).

   > To change the HOME/HERO background:
     1. Press Ctrl+F and search for ".hero".
     2. Look for the line starting with "background:".
     3. Change the filename inside url('../Images/...') to your new image.
     
     Example:
     Old: url('../Images/_V068704.jpg');
     New: url('../Images/my-new-photo.jpg');

   > To change the PORTFOLIO background:
     1. Press Ctrl+F and search for ".portfolio-section".
     2. Look for the line starting with "background:".
     3. Change the filename inside url('../Images/...') to your new image.

2. HOW TO CHANGE THEME COLORS
-----------------------------
You can change the main colors (like the Gold accent) in one place.

Step A: Open "css/style.css"
Step B: Look at the very top under ":root".

   > To change the MAIN ACCENT color (Gold):
     - Find "--accent-color: #d4af37;"
     - Replace "#d4af37" with your new color code (e.g., "#ff0000" for red).

   > To change the BACKGROUND color:
     - Find "--bg-color" (main dark background).
     - Find "--secondary-bg" (lighter sections like About/Contact).
     - Update their color codes as needed.

3. HOW TO ADD PORTFOLIO PROJECTS
--------------------------------
1. Log in to the Admin Panel (click "Admin" in the menu or go to admin.html).
2. Go to the "Add Project" tab.
3. Click "Choose File" to select your image.
4. IMPORTANT: Copy that image file into your website's "Images" folder.
5. Fill in the Title, Description, and Category.
6. Click "Add Project".

=========================================
Need help finding color codes?
Search Google for "Color Picker" to find the Hex code (like #123456) for any color you want.

4. HOW TO RUN THE WEBSITE
-------------------------
A. Running Locally (On your computer)
   - Simply double-click the "index.html" file.
   - It will open in your default web browser (Chrome, Edge, etc.).
   - No special software or server is needed!

B. Putting it Online (Hosting)
   - Since this is a static website (HTML/CSS/JS), you can host it for FREE.
   - Recommended options:
     1. GitHub Pages (if you use GitHub)
     2. Netlify (drag and drop your folder)
     3. Vercel

5. GOING LIVE - CRITICAL NOTE
-----------------------------
Before you deploy, you need to understand how your data works.

CURRENT STATE (LocalStorage):
Right now, when you add a project via the Admin Panel, it saves to your BROWSER'S memory (LocalStorage).
- If you deploy this site now, and you add a project, ONLY YOU will see it.
- Other visitors will only see the default projects in "js/data.js".

HOW TO FIX THIS FOR A STATIC SITE:
Since this is a static site (no backend database), you have two options:

Option A: Hardcode your Projects (Easiest for now)
1. Open "js/data.js".
2. You will see the list of `initialProjects`.
3. Manually add your project data there.
   Example:
   {
       id: 101,
       title: "My New Dress",
       category: "casual",
       description: "A beautiful summer dress.",
       image: "Images/my-photo.jpg"
   },
4. Save the file.
5. Now, when you deploy, EVERYONE will see these projects.

Option B: Build a Backend (Advanced)
- As discussed, this requires moving to a server (Node.js + Database).
- This allows you to log in and add projects that everyone can see instantly.

6. DEPLOYMENT STEPS (Netlify Method)
------------------------------------
1. Go to https://www.netlify.com/ and sign up (it's free).
2. Log in to your dashboard.
3. You will see a box that says "Drag and drop your site folder here".
4. Drag your entire "dnd-portfolio" folder into that box.
5. Wait a few seconds... and you're online!
6. Netlify will give you a link (e.g., "agitated-beaver-123.netlify.app").
7. You can change this name in "Site Settings" -> "Change site name".

7. IMAGE QUALITY BEST PRACTICES
-------------------------------
To ensure your fashion photos look crisp and professional:

A. Before Uploading - File Preparation
   > Use the right format:
     - JPG: For photos with many colors (dresses, patterns). Use 90-95% quality.
     - PNG: For images with transparency or text. Lossless quality.
     - WebP: Modern format, smaller file size, great quality (if your editor supports it).

   > Recommended dimensions for portfolio images:
     - Width: 1200-1600 pixels
     - Height: 1200-1600 pixels (or maintain your aspect ratio)
     - Don't go below 800px width or images will look pixelated.

   > Export settings (Photoshop/GIMP/etc.):
     - JPG Quality: Set to 90-95% (NOT 100%, it creates huge files with minimal benefit)
     - Color Profile: sRGB (for web)
     - Resolution: 72 DPI (sufficient for web)

B. Technical (Already Done for You)
   - I've added CSS rules that tell browsers NOT to compress your images.
   - Images now use "high-quality" rendering and "crisp-edges".
   - Portfolio images use "contain" instead of "cover" (no cropping).

C. If Images Still Look Blurry
   - Check your source file. Open it on your computer. If it's blurry there, re-export.
   - Make sure you copied the ORIGINAL file to the Images folder, not a compressed version.
   - Clear your browser cache (Ctrl+Shift+Delete) and refresh.



