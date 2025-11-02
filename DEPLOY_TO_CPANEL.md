# 🚀 Deploy CargoPlus to shop.cargoplus.site

## Method 1: Build & Upload (Recommended)

### Step 1: Build Production Files

```bash
# Navigate to frontend
cd frontend

# Install dependencies if not already
yarn install

# Build for production
yarn build
```

This creates a `dist` folder with all production files.

### Step 2: Upload to Server

You have **3 options**:

#### Option A: cPanel File Manager (Easiest)

1. **Login to cPanel**: https://shop.cargoplus.site:2083 (or your cPanel URL)
2. **Open File Manager**
3. **Navigate to**: `public_html` or `shop.cargoplus.site` folder
4. **Delete** all existing files (backup first!)
5. **Upload** all files from `frontend/dist` folder
6. **Extract** if uploaded as zip

#### Option B: FTP/SFTP (FileZilla)

1. **Download FileZilla**: https://filezilla-project.org/
2. **Connect**:
   - Host: `ftp.cargoplus.site` or your FTP hostname
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)
3. **Upload** all files from `frontend/dist` to `public_html`

#### Option C: Git Deploy (Advanced)

```bash
# SSH to your server
ssh username@shop.cargoplus.site

# Clone repository
cd public_html
git clone https://github.com/ar-saeedi/cargoplus.git .

# Install Node.js (if not installed)
# Then build
cd frontend
npm install
npm run build

# Move files to root
mv dist/* ../
cd ..
rm -rf frontend
```

### Step 3: Create .htaccess for React Router

Create `.htaccess` file in your root folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # React Router - Redirect all to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Step 4: Configure Environment Variables

**Option A: Using cPanel**
1. Go to **Advanced > Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = your_supabase_url
   - `VITE_SUPABASE_ANON_KEY` = your_supabase_anon_key

**Option B: Build with env variables**

Before building, create `frontend/.env.production`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.cargoplus.site
```

Then rebuild:
```bash
yarn build
```

### Step 5: Verify Deployment

1. Visit: **https://shop.cargoplus.site**
2. Check if homepage loads
3. Test navigation
4. Check browser console (F12) for errors

---

## Method 2: Using cPanel Git Deploy (Automated)

### Step 1: Enable Git in cPanel

1. Login to cPanel
2. Go to **Git Version Control**
3. Click **Create**
4. Repository URL: `https://github.com/ar-saeedi/cargoplus.git`
5. Repository Path: `/home/username/repositories/cargoplus`
6. Click **Create**

### Step 2: Create Deploy Script

Create `deploy.sh` in repository:

```bash
#!/bin/bash

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build
npm run build

# Copy to public_html
cp -r dist/* /home/username/public_html/

echo "Deployment complete!"
```

### Step 3: Auto-deploy on push

Set up webhook in cPanel Git to run deploy script on updates.

---

## Method 3: Using Vercel (Alternative - Free & Easy)

If server deployment is complex, use Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

Then point your domain to Vercel in DNS settings.

---

## 🔍 Troubleshooting

### Issue: Blank page
- Check browser console (F12)
- Verify `.htaccess` exists
- Check file permissions (755 for folders, 644 for files)

### Issue: 404 on refresh
- `.htaccess` rules not working
- Make sure mod_rewrite is enabled in server

### Issue: Environment variables not working
- Rebuild with production env file
- Variables must start with `VITE_`

### Issue: Assets not loading
- Check paths in browser DevTools > Network
- Verify all files uploaded correctly
- Check base path in `vite.config.js`

---

## 📊 Server Requirements

- **PHP**: 7.4+ (for cPanel)
- **Node.js**: 18+ (for building)
- **Web Server**: Apache/LiteSpeed with mod_rewrite
- **SSL**: Enabled (HTTPS)
- **Storage**: ~50MB for app files

---

## ⚡ Quick Deploy Checklist

- [ ] Build production files (`yarn build`)
- [ ] Upload to server (FTP/cPanel)
- [ ] Create `.htaccess` file
- [ ] Set environment variables
- [ ] Test website
- [ ] Check all pages work
- [ ] Test on mobile
- [ ] Monitor errors

---

## 🆘 Need Help?

Contact: Alireza Saeedi  
Email: alirezasaeediofficial@gmail.com  
Telegram: [@AR_Saeedi](https://t.me/AR_Saeedi)

