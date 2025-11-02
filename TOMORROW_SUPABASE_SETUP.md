# 🗄️ Tomorrow's Supabase Setup Guide

## ✅ **What's Ready NOW**

Your two-sided marketplace is ready:

### ✓ Completed Features:
- ✅ Separate registration for Buyers & Vendors
- ✅ Buyer registration form (simple)
- ✅ Vendor registration form (with company details)
- ✅ User role/type system in code
- ✅ Vendor store pages
- ✅ Product listing form for vendors
- ✅ Image upload interface
- ✅ All UI components

### ⏳ Needs Supabase (Tomorrow):
- Database tables
- Authentication
- File storage
- Real data

---

## 🚀 **Tomorrow's Setup (30 minutes)**

### Step 1: Create Supabase Account (5 min)

1. **Go to**: https://supabase.com
2. **Sign up** with your email
3. **Verify** your email
4. **Login** to dashboard

### Step 2: Create New Project (2 min)

1. Click **"New Project"**
2. Fill in:
   - **Name**: `CargoPlus Marketplace`
   - **Database Password**: (Choose strong password - SAVE IT!)
   - **Region**: Choose closest to Iran (Europe/Middle East)
3. Click **"Create Project"**
4. Wait ~2 minutes for setup

### Step 3: Run Database Schema (5 min)

1. In Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. **Copy ALL** content from `SUPABASE_SCHEMA.sql`
4. **Paste** into editor
5. Click **"Run"** or press F5
6. Should see: ✅ Success
7. Check **Table Editor** - you'll see 8 new tables!

### Step 4: Create Storage Buckets (3 min)

1. Go to **Storage** in sidebar
2. Click **"Create Bucket"**
3. Create:
   - **Name**: `products`
   - **Public**: ✅ Yes
   - Click **"Create"**

4. Repeat for:
   - **Name**: `vendors`
   - **Public**: ✅ Yes

5. Repeat for:
   - **Name**: `reviews`
   - **Public**: ✅ Yes

### Step 5: Get Your Credentials (2 min)

1. Go to **Settings** → **API**
2. Copy these:
   - ✅ **Project URL** (starts with https://)
   - ✅ **anon/public key** (long string)

### Step 6: Update Frontend Environment (3 min)

On your computer:

1. Open: `C:\Coding\b2bmarketplace\frontend\.env.local`
2. Replace with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
VITE_API_URL=http://localhost:9000
```
3. Save file

### Step 7: Rebuild & Redeploy (5 min)

```bash
# In terminal
cd C:\Coding\b2bmarketplace\frontend

# Rebuild with Supabase credentials
yarn build

# Upload new dist/ folder to shop.cargoplus.site
# Same process as before:
# - cPanel File Manager
# - Delete old files
# - Upload new dist/ files
```

### Step 8: Test Everything (5 min)

1. Visit: https://shop.cargoplus.site
2. Test **Buyer Registration**:
   - Click "ثبت‌نام" → "ثبت‌نام خریدار"
   - Fill form
   - Submit
   - Check Supabase Auth → Users (should see new user!)

3. Test **Vendor Registration**:
   - Logout
   - Click "ثبت‌نام" → "ثبت‌نام فروشنده"
   - Fill company details
   - Submit
   - Check Supabase: Auth + Vendors table

4. Test **Login**:
   - Login with vendor account
   - Go to Vendor Panel
   - Add a product
   - Upload images
   - Publish

5. Test **Buyer Side**:
   - Login as buyer
   - Browse products
   - Add to cart
   - Complete order
   - Check Supabase Orders table!

---

## 📊 **Database Tables Created**

After running SQL, you'll have:

1. **vendors** - Company information
2. **products** - Product listings
3. **orders** - Customer orders
4. **order_items** - Items in orders
5. **favorites** - User wishlist
6. **addresses** - Shipping addresses
7. **reviews** - Product ratings
8. **categories** - Product categories

Plus **Auth Users** from Supabase Auth!

---

## 🔐 **Authentication Flow**

### After Supabase Connected:

**Buyer Registration:**
```
1. User fills form
2. Supabase Auth creates user
3. user_type = 'buyer' saved
4. User logged in automatically
5. Redirected to dashboard
```

**Vendor Registration:**
```
1. Vendor fills form
2. Supabase Auth creates user
3. user_type = 'vendor' saved
4. Vendors table row created
5. Company info saved
6. Redirected to vendor panel
```

---

## 🔑 **Important Fields**

### Auth Users (Supabase Auth):
```json
{
  "email": "user@example.com",
  "user_metadata": {
    "full_name": "علی احمدی",
    "phone": "09123456789",
    "user_type": "buyer",      ← KEY!
    "company_name": "شرکت...",  ← For vendors
    "business_type": "...",     ← For vendors
    "city": "تهران",
    "address": "..."
  }
}
```

### Vendors Table:
```json
{
  "user_id": "uuid-from-auth",
  "company_name": "شرکت تجاری",
  "business_type": "wholesaler",
  "phone": "021-1234567",
  "city": "تهران",
  "is_verified": false,  ← Admin can verify later
  "rating": 0.0
}
```

---

## 🎯 **Expected Results Tomorrow**

### After Setup:

1. ✅ **Buyers can**:
   - Register with simple form
   - Login
   - Browse products from ALL vendors
   - Add to cart
   - Place orders
   - View order history

2. ✅ **Vendors can**:
   - Register with company details
   - Login
   - Access vendor panel
   - Add/edit/delete products
   - Upload product images
   - View their orders
   - See sales statistics

3. ✅ **Products**:
   - Each product linked to specific vendor
   - Displayed on main site
   - Buyers can buy from any vendor
   - Vendors only see/edit their own products

---

## 📝 **Pre-Tomorrow Checklist**

Today (Now):
- ✅ Two-sided registration system created
- ✅ Vendor store pages ready
- ✅ Product listing form ready
- ✅ Database schema prepared
- ✅ All UI components ready

Tomorrow (With Supabase):
- [ ] Create Supabase project
- [ ] Run SQL schema
- [ ] Create storage buckets
- [ ] Get API credentials
- [ ] Update .env file
- [ ] Rebuild project
- [ ] Redeploy to server
- [ ] Test registration flow
- [ ] Test product creation
- [ ] Test order flow

---

## 🎓 **What You'll Learn**

- How to set up Supabase
- Database tables & relationships
- Row Level Security (RLS)
- File uploads to Supabase Storage
- User authentication
- Real-time features (bonus!)

---

## 📞 **If You Need Help Tomorrow**

**Common Issues:**

### Issue: Can't see tables
- Make sure SQL ran successfully
- Check for errors in SQL editor
- Run queries one section at a time

### Issue: Registration fails
- Check browser console
- Verify API credentials in .env
- Rebuild after changing .env

### Issue: Images won't upload
- Check storage buckets exist
- Verify bucket is public
- Check RLS policies

---

## 🎉 **Summary**

### **TODAY:**
- ✅ Upload current build to shop.cargoplus.site
- ✅ Test UI (works without backend)
- ✅ Everything looks perfect!

### **TOMORROW:**
- 🗄️ Set up Supabase (30 min)
- 🔄 Rebuild with credentials
- 📤 Redeploy
- ✅ Full marketplace working!

---

## 📧 **Before Tomorrow**

**Save These**:
- ✅ Supabase username & password
- ✅ Database password
- ✅ Project URL
- ✅ API keys

**Have Ready**:
- File: `SUPABASE_SCHEMA.sql`
- Access to: `C:\Coding\b2bmarketplace`
- cPanel access

---

**You're all set! Everything is prepared for tomorrow's Supabase integration!** 🚀

The two-sided marketplace structure is complete - just needs the database backend tomorrow!

