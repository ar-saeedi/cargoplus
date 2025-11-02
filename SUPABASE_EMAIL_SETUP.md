# 📧 Email Verification Setup - Supabase

## 🎯 **Enable Email Verification for CargoPlus**

This guide will set up email verification so users must confirm their email before accessing the marketplace.

---

## 🔧 **Step 1: Enable Email Confirmation in Supabase**

### **1. Go to Authentication Settings**

1. Login to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **Cargoplus Shop**
3. Click **"Authentication"** in sidebar
4. Click **"Providers"** tab
5. Find **"Email"** provider
6. Click **"Edit"**

### **2. Enable Email Confirmation**

1. Toggle ON: **"Enable Email Confirmations"** ✅
2. Settings:
   - **Enable email confirmations:** ✅ ON
   - **Secure email change:** ✅ ON (recommended)
   - **Double confirm email changes:** ✅ ON (recommended)
3. Click **"Save"**

---

## 📝 **Step 2: Configure Email Templates (Optional - Better UX)**

### **Customize Welcome Email**

1. Go to **Authentication** → **Email Templates**
2. Click **"Confirm signup"** template
3. Customize the email:

```html
<h2>به CargoPlus خوش آمدید! 🚚</h2>

<p>سلام {{ .Email }},</p>

<p>برای تکمیل ثبت‌نام در CargoPlus، لطفا ایمیل خود را تایید کنید.</p>

<p>
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #ef4444; color: white; padding: 12px 24px; 
            text-decoration: none; border-radius: 8px; display: inline-block;">
    تایید ایمیل
  </a>
</p>

<p>یا این لینک را کپی کنید:</p>
<p style="color: #666;">{{ .ConfirmationURL }}</p>

<p style="color: #999; font-size: 12px;">
  اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.
</p>

<p>با تشکر،<br/>تیم CargoPlus</p>
```

4. **Subject:** `تایید ایمیل - CargoPlus`
5. Click **"Save"**

---

## 🔗 **Step 3: Configure Redirect URLs**

### **Set Site URL**

1. Go to **Authentication** → **URL Configuration**
2. **Site URL:** `https://shop.cargoplus.site`
3. **Redirect URLs:** Add these:
   ```
   https://shop.cargoplus.site
   https://shop.cargoplus.site/**
   https://shop.cargoplus.site/auth/callback
   http://localhost:5173
   http://localhost:5173/**
   ```
4. Click **"Save"**

---

## ⚙️ **Step 4: Update Frontend Code**

### **Already Done!** ✅

I've already created:
- ✅ `VerifyEmailPage.jsx` - Verification waiting page
- ✅ Updated registration flow
- ✅ Email resend functionality
- ✅ Auto-redirect after verification

---

## 🔄 **Step 5: Rebuild & Redeploy**

```bash
# 1. Rebuild with email verification enabled
cd C:\Coding\b2bmarketplace\frontend
yarn build

# 2. Upload new dist/ files to server
# (Same process as before)
```

---

## 📧 **How It Works**

### **User Flow:**

```
1. User fills registration form
   ↓
2. Submits (buyer or vendor)
   ↓
3. Supabase creates account (email_confirmed = false)
   ↓
4. Sends verification email to user's Gmail/Yahoo/etc
   ↓
5. User redirected to "Verify Email" page
   ↓
6. User checks their email
   ↓
7. Clicks verification link in email
   ↓
8. Supabase confirms email (email_confirmed = true)
   ↓
9. User auto-logged in
   ↓
10. Redirected to:
    - Vendor → /vendor panel
    - Buyer → /dashboard
```

---

## 📧 **Email Content**

### **What Users Receive:**

**Subject:** `تایید ایمیل - CargoPlus`

**From:** `noreply@mail.app.supabase.io` (default)

**Content:**
```
به CargoPlus خوش آمدید!

سلام user@example.com,

برای تکمیل ثبت‌نام در CargoPlus، لطفا ایمیل خود را تایید کنید.

[تایید ایمیل] ← Button

یا این لینک را کپی کنید:
https://ayhddcdeyuxvuxalvhkg.supabase.co/auth/v1/verify?token=...

با تشکر،
تیم CargoPlus
```

---

## 🎨 **Customize Email Further (Advanced)**

### **Use Custom SMTP (Optional)**

For branded emails (from@cargoplus.site instead of Supabase):

1. Go to **Project Settings** → **Auth**
2. Scroll to **SMTP Settings**
3. Enable **"Use Custom SMTP"**
4. Configure:
   ```
   Host: smtp.gmail.com (or your provider)
   Port: 587
   User: your-email@gmail.com
   Password: (app password)
   Sender email: noreply@cargoplus.site
   Sender name: CargoPlus
   ```
5. **Save**

---

## 🧪 **Testing Email Verification**

### **Test 1: Buyer Registration**

1. Go to: https://shop.cargoplus.site/auth/register/buyer
2. Use **real email** (your Gmail/Yahoo)
3. Complete form
4. Click register
5. See "Verify Email" page
6. Check your email inbox
7. Click verification link
8. Should auto-login!

### **Test 2: Vendor Registration**

1. Go to: https://shop.cargoplus.site/auth/register/vendor
2. Use different real email
3. Complete form (personal + business)
4. Click register
5. Check email
6. Verify
7. Should redirect to Vendor Panel!

### **Test 3: Resend Email**

1. On verify page
2. Click "ارسال مجدد ایمیل"
3. Check inbox again
4. Should receive new email

---

## 🐛 **Troubleshooting**

### **Problem: Email not received**

**Solutions:**
1. Check Spam folder
2. Wait 1-2 minutes
3. Check email is correct
4. Click "Resend email"
5. Check Supabase logs: Authentication → Logs

### **Problem: Link doesn't work**

**Solutions:**
1. Link expires after 1 hour
2. Request new email
3. Check Site URL is correct in Supabase

### **Problem: Still shows unverified**

**Solutions:**
1. Logout and login again
2. Check browser console (F12)
3. Verify in Supabase: Authentication → Users → email_confirmed_at

---

## 🔒 **Security Benefits**

### **Why Email Verification?**

✅ **Prevents fake accounts**
- Must have real email

✅ **Reduces spam**
- Bots can't register easily

✅ **Verifies contact info**
- Can send order updates

✅ **Professional**
- Standard for marketplaces

✅ **Recovery**
- Can reset password via email

---

## 📊 **User States**

### **In Supabase auth.users:**

**Before Verification:**
```json
{
  "email": "user@gmail.com",
  "email_confirmed_at": null,  ← Not verified
  "confirmed_at": null
}
```

**After Verification:**
```json
{
  "email": "user@gmail.com",
  "email_confirmed_at": "2025-11-02T10:30:00",  ← Verified!
  "confirmed_at": "2025-11-02T10:30:00"
}
```

---

## 🎯 **Final Checklist**

**In Supabase Dashboard:**
- [ ] Authentication → Providers → Email → Edit
- [ ] Enable "Email Confirmations" ✅
- [ ] Save settings
- [ ] (Optional) Customize email template
- [ ] (Optional) Set Site URL
- [ ] (Optional) Add redirect URLs

**On Your Computer:**
- [x] VerifyEmailPage.jsx created
- [x] Registration flow updated
- [x] Resend email function added
- [ ] Rebuild: `yarn build`
- [ ] Upload new dist/ to server

**Test:**
- [ ] Register with real email
- [ ] Receive verification email
- [ ] Click link
- [ ] Access marketplace!

---

## 📧 **Example Test Emails You Can Use**

**For Testing:**
- Your personal Gmail
- Your Yahoo email
- Any real email you have access to

**DON'T use:**
- Fake emails (won't receive verification)
- Temporary email services (might not work)

---

## ✨ **After Setup**

### **Every New User:**

**Buyers:**
```
Register → Email sent → Verify → Access Dashboard ✅
```

**Vendors:**
```
Register → Email sent → Verify → Access Vendor Panel ✅
```

**Without Verification:**
```
Register → Email sent → Can't login until verified ⏸️
```

---

## 🚀 **Ready to Enable!**

**Quick Steps:**
1. Supabase → Authentication → Providers → Email
2. Toggle ON "Email Confirmations"
3. Save
4. Rebuild: `yarn build`
5. Upload to server
6. Test with your email!

---

**Your marketplace now has professional email verification!** 🎉

Developer: Alireza Saeedi  
Feature: Email Verification System  
Status: Ready to Enable ✅

