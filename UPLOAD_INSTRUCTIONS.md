# 📤 Upload Instructions for shop.cargoplus.site

## ✅ Files Are Ready!

Your production files are built in: `frontend/dist/`

## 🎯 Quick Upload Steps

### Option 1: cPanel File Manager (Easiest) ⭐

1. **Login to cPanel**
   - URL: Usually `https://shop.cargoplus.site:2083` or `https://cargoplus.site/cpanel`
   - Enter your username and password

2. **Open File Manager**
   - Click "File Manager" icon
   - Navigate to `public_html` folder

3. **Clean Directory**
   - Select all existing files (except `cgi-bin` folder)
   - Click "Delete"
   - Confirm deletion

4. **Upload Files**
   - Click "Upload" button
   - Navigate to `C:\Coding\b2bmarketplace\frontend\dist`
   - Select ALL files and folders:
     - `index.html`
     - `assets` folder
     - `.htaccess`
     - `favicon.svg`
   - Wait for upload to complete

5. **Verify**
   - Visit: https://shop.cargoplus.site
   - Should see your CargoPlus marketplace!

---

### Option 2: Upload as ZIP (Faster)

1. **Create ZIP** (in Windows):
   - Open `frontend/dist` folder
   - Select all files
   - Right-click → Send to → Compressed (zipped) folder
   - Name it: `cargoplus.zip`

2. **Upload to cPanel**:
   - Login to cPanel File Manager
   - Go to `public_html`
   - Upload `cargoplus.zip`
   - Right-click the zip → Extract
   - Delete the zip file after extraction

3. **Done!** ✅

---

### Option 3: FTP with FileZilla

1. **Download FileZilla**: https://filezilla-project.org/

2. **Connect**:
   - Host: `ftp.cargoplus.site` (or IP address)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload**:
   - Left side: Navigate to `C:\Coding\b2bmarketplace\frontend\dist`
   - Right side: Navigate to `/public_html`
   - Drag all files from left to right
   - Wait for transfer to complete

---

## ⚙️ Important Files

Make sure these files are uploaded:

### Must Have:
- ✅ `index.html` - Main HTML file
- ✅ `assets/` folder - All CSS, JS, fonts
- ✅ `.htaccess` - Server configuration (IMPORTANT!)
- ✅ `favicon.svg` - Site icon

### File Structure in Server:
```
public_html/
├── index.html
├── .htaccess
├── favicon.svg
└── assets/
    ├── index-XXXXX.css
    └── index-XXXXX.js
```

---

## 🔧 Post-Upload Configuration

### 1. Verify .htaccess

Make sure `.htaccess` file is visible and uploaded.

**In cPanel File Manager**:
- Click "Settings" (top right)
- Check "Show Hidden Files (dotfiles)"
- Click "Save"
- You should now see `.htaccess`

### 2. File Permissions

Right-click each file/folder → Change Permissions:
- **Folders**: 755
- **Files**: 644

### 3. Test Your Site

Open: https://shop.cargoplus.site

Should see:
- ✅ CargoPlus homepage
- ✅ Persian text, RTL layout
- ✅ Search bar works
- ✅ Navigation works
- ✅ All pages accessible

---

## 🐛 Troubleshooting

### Issue: Blank Page
**Solution**:
1. Check browser console (F12) for errors
2. Verify all files uploaded correctly
3. Check `.htaccess` exists
4. Clear browser cache (Ctrl+Shift+R)

### Issue: 404 on Page Refresh
**Solution**:
1. `.htaccess` not uploaded or not working
2. Make it visible (show dotfiles)
3. Check mod_rewrite enabled on server

### Issue: CSS/JS not loading
**Solution**:
1. Check Network tab in browser DevTools
2. Verify `assets` folder uploaded
3. Check file permissions
4. Clear browser cache

### Issue: "Index of /" appears
**Solution**:
1. `index.html` not in correct location
2. Should be directly in `public_html`
3. Not in a subfolder!

---

## 🌐 Environment Variables (For Supabase)

### Method 1: Build with Variables

Before building, edit `frontend/.env.production`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_API_URL=https://api.cargoplus.site
```

Then:
```bash
cd frontend
yarn build
```

Upload the new `dist` folder.

### Method 2: Use Different Build

For demo (no Supabase needed):
- Current build works!
- Authentication won't work, but UI is visible

For production (with Supabase):
- Set real Supabase credentials
- Rebuild
- Upload new files

---

## 📋 Quick Checklist

Before uploading:
- [ ] Production build completed (`yarn build`)
- [ ] `.htaccess` file created
- [ ] Environment variables set (if using Supabase)
- [ ] Backup existing site (if any)

After uploading:
- [ ] All files in `public_html`
- [ ] `.htaccess` visible and configured
- [ ] File permissions correct (755/644)
- [ ] Site loads at https://shop.cargoplus.site
- [ ] No console errors
- [ ] SSL certificate working (HTTPS)
- [ ] All pages accessible

---

## 🎯 Expected Result

After successful deployment:

**URL**: https://shop.cargoplus.site

**You'll see**:
- 🚚 CargoPlus logo and branding
- 🔍 Search bar in Persian
- 📦 Product categories
- 💫 Beautiful homepage with banners
- 📱 Fully responsive design
- ✨ Smooth animations

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console (F12)
2. Check cPanel Error Logs
3. Contact your hosting support
4. Or contact me:
   - Email: alirezasaeediofficial@gmail.com
   - Telegram: @AR_Saeedi

---

## 🚀 You're Ready to Deploy!

**Recommended: Option 1 (cPanel File Manager)** - Easiest and most reliable.

Good luck! 🎉

