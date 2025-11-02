# ✅ Enable Email Verification - Quick Guide

## 🎯 **3 Steps to Enable Email Verification**

---

## **STEP 1: Enable in Supabase** (2 minutes)

### **Go to your Supabase Dashboard:**

1. Visit: https://supabase.com/dashboard/project/ayhddcdeyuxvuxalvhkg
2. Click **"Authentication"** (left sidebar)
3. Click **"Providers"** tab
4. Find **"Email"** and click it
5. Scroll down to find: **"Confirm email"**
6. Toggle it **ON** ✅
7. Click **"Save"**

**Done!** Supabase will now send verification emails!

---

## **STEP 2: Set Your Website URL** (1 minute)

1. Still in Authentication section
2. Click **"URL Configuration"** tab
3. Find **"Site URL"**
4. Enter: `https://shop.cargoplus.site`
5. Click **"Save"**

---

## **STEP 3: Rebuild & Upload** (5 minutes)

### **Files are already built!**

Upload from: `C:\Coding\b2bmarketplace\frontend\dist\`

To: `/home/carglpct/shop.cargoplus.site/` (via cPanel)

---

## 🧪 **How to Test**

### **Test Registration:**

1. Go to: https://shop.cargoplus.site
2. Click "ثبت‌نام" → Choose buyer or vendor
3. Use **YOUR REAL EMAIL** (Gmail, Yahoo, etc.)
4. Fill form and submit
5. You'll see: **"تایید ایمیل"** page
6. Check your email inbox
7. Open email from Supabase
8. Click the verification link
9. Automatically logged in! ✅

---

## 📧 **What the Email Looks Like**

**Subject:** Confirm Your Signup

**From:** noreply@mail.app.supabase.io

**Content:**
```
Confirm your signup

Follow this link to confirm your user:

[Confirm your mail] ← Click this button

Or copy and paste this URL:
https://ayhddcdeyuxvuxalvhkg.supabase.co/auth/v1/verify?token=...
```

---

## ⚠️ **Important**

### **Use Real Email for Testing!**

✅ **Good:**
- your-email@gmail.com
- your-email@yahoo.com
- Any email you can access

❌ **Don't use:**
- fake@fake.com (won't receive email)
- test@test.com (won't work)

---

## 🔄 **User Flow**

```
User registers
    ↓
Supabase sends email
    ↓
User sees "Verify Email" page
    ↓
User checks email (Gmail, Yahoo, etc.)
    ↓
User clicks link in email
    ↓
Email confirmed ✅
    ↓
Auto-login to marketplace
    ↓
Buyer → Dashboard
Vendor → Vendor Panel
```

---

## 📋 **Quick Checklist**

**In Supabase (Do Once):**
- [ ] Go to Authentication → Providers → Email
- [ ] Toggle ON "Confirm email"
- [ ] Save
- [ ] Set Site URL to: https://shop.cargoplus.site

**On Your Computer (Already Done!):**
- [x] Email verification page created
- [x] Registration flow updated
- [x] Files built in dist/

**Deploy:**
- [ ] Upload dist/ to server
- [ ] Test with real email
- [ ] Receive verification email
- [ ] Click link
- [ ] Access marketplace!

---

## ✨ **That's It!**

**Just enable in Supabase and it works!**

No code changes needed - everything is ready! 🎉

---

**Current Status:** Ready to enable  
**Time to setup:** 3 minutes  
**Location:** Supabase Dashboard → Authentication → Providers → Email

