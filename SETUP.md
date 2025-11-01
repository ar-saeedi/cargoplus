# راهنمای نصب و راه‌اندازی

## پیش‌نیازها

- Node.js v18 یا بالاتر
- Yarn یا npm
- حساب کاربری Supabase

## مراحل نصب

### 1. نصب Dependencies

```bash
yarn install
# یا
npm install
```

### 2. تنظیم Supabase

#### 2.1 ایجاد پروژه Supabase

1. به [Supabase Dashboard](https://supabase.com/dashboard) بروید
2. یک پروژه جدید ایجاد کنید
3. منتظر بمانید تا پروژه آماده شود

#### 2.2 ایجاد جداول دیتابیس

در SQL Editor در Supabase، کوئری‌های زیر را اجرا کنید:

```sql
-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category TEXT NOT NULL,
  vendor_id UUID REFERENCES auth.users(id),
  stock INTEGER DEFAULT 0,
  min_order INTEGER DEFAULT 1,
  images TEXT[],
  specifications JSONB,
  rating DECIMAL(3, 2) DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites Table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Addresses Table
CREATE TABLE addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Products: همه می‌توانند بخوانند، فقط صاحبان می‌توانند بنویسند
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own products" ON products
  FOR INSERT WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Users can update their own products" ON products
  FOR UPDATE USING (auth.uid() = vendor_id);

CREATE POLICY "Users can delete their own products" ON products
  FOR DELETE USING (auth.uid() = vendor_id);

-- Orders: فقط صاحب سفارش می‌تواند ببیند
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Favorites: فقط صاحب می‌تواند ببیند و مدیریت کند
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Addresses: فقط صاحب می‌تواند ببیند و مدیریت کند
CREATE POLICY "Users can view their own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Reviews: همه می‌توانند بخوانند، فقط نویسنده می‌تواند حذف کند
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
```

#### 2.3 ایجاد Storage Bucket

1. به بخش Storage در Supabase بروید
2. یک bucket با نام `products` ایجاد کنید
3. تنظیمات Public را فعال کنید

### 3. تنظیم متغیرهای محیطی

#### Frontend

فایل `frontend/.env` را ایجاد کنید:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:9000
```

مقادیر را از Settings > API در Supabase Dashboard خود کپی کنید.

### 4. اجرای پروژه

#### Development Mode

```bash
# Frontend
cd frontend
yarn dev

# یا از root directory
yarn workspace frontend dev
```

Frontend در آدرس `http://localhost:5173` در دسترس خواهد بود.

### 5. ساخت محصولات نمونه

برای تست، می‌توانید محصولات نمونه در Supabase ایجاد کنید:

```sql
INSERT INTO products (name, description, price, original_price, category, stock, images)
VALUES
  ('محصول نمونه 1', 'توضیحات محصول', 125000, 150000, 'women', 50, ARRAY['image1.jpg']),
  ('محصول نمونه 2', 'توضیحات محصول', 225000, 280000, 'men', 30, ARRAY['image2.jpg']),
  ('محصول نمونه 3', 'توضیحات محصول', 99000, 120000, 'electronics', 100, ARRAY['image3.jpg']);
```

## ساختار پروژه

```
persian-marketplace/
├── frontend/
│   ├── src/
│   │   ├── components/       # کامپوننت‌های قابل استفاده مجدد
│   │   ├── pages/           # صفحات اصلی
│   │   ├── layouts/         # لی‌اوت‌ها
│   │   ├── lib/             # کتابخانه‌های کمکی (Supabase)
│   │   ├── store/           # State management (Zustand)
│   │   ├── utils/           # توابع کمکی
│   │   └── locales/         # فایل‌های ترجمه
│   └── public/
├── package.json
└── README.md
```

## ویژگی‌های پیاده‌سازی شده

### برای خریداران
- ✅ ثبت‌نام و ورود با Supabase Auth
- ✅ مشاهده و جستجوی محصولات
- ✅ افزودن به سبد خرید
- ✅ لیست علاقه‌مندی‌ها
- ✅ مدیریت آدرس‌ها
- ✅ تکمیل خرید و پرداخت
- ✅ مشاهده سفارشات

### برای فروشندگان
- ✅ پنل فروشنده
- ✅ مدیریت محصولات
- ✅ مشاهده سفارشات
- ✅ آمار و گزارش‌ها

### امکانات عمومی
- ✅ طراحی RTL و فارسی
- ✅ Responsive Design
- ✅ دسته‌بندی محصولات
- ✅ فیلتر و جستجو
- ✅ امتیازدهی و نظرات

## توسعه بیشتر

برای افزودن امکانات بیشتر:

1. **پرداخت آنلاین**: یکپارچه‌سازی با درگاه‌های پرداخت ایرانی
2. **پیام‌رسانی**: سیستم چت بین خریدار و فروشنده
3. **اعلان‌ها**: Push Notifications
4. **پنل ادمین**: مدیریت کل پلتفرم
5. **گزارش‌گیری**: داشبوردهای تحلیلی پیشرفته
6. **API Documentation**: مستندسازی کامل API

## مشکلات رایج

### خطای CORS
اطمینان حاصل کنید که در تنظیمات Supabase، دامنه localhost اضافه شده است.

### خطای Authentication
بررسی کنید که کلیدهای Supabase در فایل .env صحیح باشند.

### خطای Build
پکیج‌های Node را دوباره نصب کنید:
```bash
rm -rf node_modules
yarn install
```

## لایسنس

MIT

## پشتیبانی

برای سوالات و مشکلات، یک Issue در GitHub ایجاد کنید.

