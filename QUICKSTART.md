# 🚀 Quick Start Guide - Fix Blank Page

## The blank page issue is because the `.env` file is missing!

Follow these simple steps:

### Step 1: Create Environment File

Create a file named `.env` in the `frontend` folder with this content:

```env
VITE_SUPABASE_URL=https://placeholder.supabase.co
VITE_SUPABASE_ANON_KEY=placeholder-key
VITE_API_URL=http://localhost:9000
```

**Location**: `frontend/.env` (not in the root!)

### Step 2: Install Dependencies

```bash
cd frontend
yarn install
# or
npm install
```

### Step 3: Run the Development Server

```bash
yarn dev
# or
npm run dev
```

### Step 4: Visit the Site

Open your browser and go to: http://localhost:5173

**You should now see the homepage!** 🎉

---

## ⚠️ Important Notes

### For Demo/Testing (Works Without Supabase)
The app will work with placeholder values, but:
- ❌ Authentication won't work (login/register)
- ❌ Can't save data
- ✅ Can browse the UI
- ✅ Can see all pages and design
- ✅ Cart works (stored in browser)

### For Full Functionality (Need Real Supabase)

If you want authentication and data storage to work:

1. **Create Supabase Account**: https://supabase.com

2. **Create New Project** in Supabase Dashboard

3. **Get Your Credentials**:
   - Go to Settings → API
   - Copy `Project URL` and `anon/public key`

4. **Update `.env` file**:
```env
VITE_SUPABASE_URL=your-actual-project-url
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_API_URL=http://localhost:9000
```

5. **Create Database Tables**:
   - Go to SQL Editor in Supabase
   - Run the SQL from `SETUP.md`

6. **Restart Dev Server**:
```bash
yarn dev
```

---

## 🐛 Still Having Issues?

### Issue: Blank page

**Solution 1**: Make sure `.env` file exists in `frontend` folder
```bash
cd frontend
ls -la .env  # Should see the file
```

**Solution 2**: Restart the dev server
```bash
# Stop the server (Ctrl+C)
yarn dev
```

**Solution 3**: Clear browser cache
- Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

### Issue: Console errors

Open browser console (F12) and check for errors. Common fixes:

1. **Module not found**: Run `yarn install` again
2. **Network error**: Check if dev server is running
3. **Supabase error**: Check if `.env` values are correct

### Issue: Port already in use

```bash
# Kill process on port 5173
# On Linux/Mac:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Then run again:
yarn dev
```

---

## 📁 File Structure Check

Make sure your structure looks like this:

```
b2bmarketplace/
├── frontend/
│   ├── .env          ← Must exist!
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

---

## ✅ Verification

After following the steps, you should see:

1. ✅ Homepage with banners
2. ✅ Persian/Farsi text
3. ✅ Right-to-left layout
4. ✅ Navigation menu
5. ✅ Product categories
6. ✅ Footer

---

## 🎯 Next Steps

Once the site is running:

1. **Browse the UI**: Click around to see all pages
2. **Try the Cart**: Add items (works without backend)
3. **Check Responsive**: Resize browser window
4. **Test Navigation**: Visit different pages

When you're ready for full functionality:
- Set up Supabase (see above)
- Run database migrations
- Test authentication

---

## 💡 Quick Tips

- **Dev Server URL**: Always `http://localhost:5173`
- **Changes auto-reload**: No need to restart
- **Console logs**: Helpful for debugging
- **Network tab**: Check API calls

---

## 🆘 Need Help?

1. Check browser console (F12)
2. Check terminal for errors
3. Verify `.env` file exists and has content
4. Make sure you're in the `frontend` folder when running commands
5. Try `yarn install` again

**Common Command Mistakes**:

❌ Wrong:
```bash
# Don't run from root
yarn dev  # This won't work!
```

✅ Correct:
```bash
# Always from frontend folder
cd frontend
yarn dev  # This works!
```

---

That's it! Your Persian marketplace should now be running! 🚀

If you still see a blank page after following these steps, please:
1. Check the browser console for errors (F12)
2. Share the error message
3. Verify the `.env` file exists in `frontend` folder

