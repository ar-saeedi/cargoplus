# 🚚 CargoPlus | بازار آنلاین فارسی

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8.svg?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ecf8e.svg?logo=supabase)
![RTL](https://img.shields.io/badge/RTL-Supported-success.svg)

یک پلتفرم جامع بازار آنلاین B2B و B2C به زبان فارسی با پشتیبانی کامل از RTL، الهام گرفته از 1688.com

---

## 👨‍💻 **Developer**

**Alireza Saeedi**  
*Fullstack Developer - Lead*

[![Email](https://img.shields.io/badge/Email-alirezasaeediofficial%40gmail.com-red?logo=gmail&logoColor=white)](mailto:alirezasaeediofficial@gmail.com)
[![Telegram](https://img.shields.io/badge/Telegram-AR__Saeedi-26A5E4?logo=telegram&logoColor=white)](https://t.me/AR_Saeedi)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-25D366?logo=whatsapp&logoColor=white)](https://wa.me/989910615570)

---

## ویژگی‌های اصلی

### برای خریداران
- 🛒 سبد خرید و لیست علاقه‌مندی‌ها
- 📦 مدیریت سفارشات (در انتظار پرداخت، در حال ارسال، تحویل داده شده)
- 💳 سیستم پرداخت امن
- ⭐ امتیازدهی و نظرات
- 🔍 جستجوی پیشرفته با فیلترها
- 📱 پنل کاربری جامع

### برای فروشندگان
- 🏪 ایجاد فروشگاه آنلاین
- 📊 پنل مدیریت محصولات
- 📈 گزارشات فروش و آمار
- 💰 مدیریت مالی و کمیسیون
- 🚚 مدیریت ارسال و انبار
- 👥 مدیریت مشتریان

### امکانات ویژه
- 🌐 پخش و توزیع (دراپ‌شیپینگ)
- 🏭 جستجوی کارخانجات
- 💼 خرید سازمانی
- 🎁 سیستم تخفیف و کوپن
- 📱 پشتیبانی موبایل
- 🔄 سفارش مجدد سریع

## تکنولوژی‌های استفاده شده

### Frontend
- ⚛️ React 18
- 🎨 Tailwind CSS با پشتیبانی RTL
- 🔄 React Query برای مدیریت state
- 🛣️ React Router برای مسیریابی
- 🌐 i18next برای چندزبانگی
- 📱 Responsive Design

### Backend
- 🚀 MedusaJS v2
- 🗄️ Supabase (PostgreSQL + Auth + Storage)
- 🔐 Authentication با Supabase Auth
- 💾 File Storage با Supabase Storage
- 🔌 RESTful API

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js v18+
- Yarn یا npm
- حساب Supabase

### راه‌اندازی

1. **نصب Dependencies**
\`\`\`bash
yarn install
\`\`\`

2. **تنظیم متغیرهای محیطی**

فایل `.env` را در پوشه `frontend` ایجاد کنید:
\`\`\`
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:9000
\`\`\`

فایل `.env` را در پوشه `backend` ایجاد کنید:
\`\`\`
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
\`\`\`

3. **اجرای پروژه**
\`\`\`bash
yarn dev
\`\`\`

Frontend: http://localhost:5173
Backend: http://localhost:9000

## ساختار پروژه

\`\`\`
persian-marketplace/
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # کامپوننت‌های قابل استفاده مجدد
│   │   ├── pages/         # صفحات اصلی
│   │   ├── layouts/       # لی‌اوت‌ها
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # توابع کمکی
│   │   ├── locales/       # فایل‌های ترجمه
│   │   └── styles/        # استایل‌های سراسری
│   └── public/            # فایل‌های استاتیک
├── backend/               # MedusaJS Backend
│   ├── src/
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   └── subscribers/  # Event handlers
│   └── medusa-config.js
└── README.md
\`\`\`

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 🤝 مشارکت

برای مشارکت در این پروژه:
1. Repository را Fork کنید
2. یک Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به Branch خود Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

## 💬 پشتیبانی و تماس

برای سوالات، پیشنهادات یا گزارش مشکلات:

- 📧 Email: [alirezasaeediofficial@gmail.com](mailto:alirezasaeediofficial@gmail.com)
- 💬 Telegram: [@AR_Saeedi](https://t.me/AR_Saeedi)
- 📱 WhatsApp: [+98 991 061 5570](https://wa.me/989910615570)

---

<div align="center">

**ساخته شده با ❤️ توسط Alireza Saeedi**

[![GitHub](https://img.shields.io/badge/GitHub-ar--saeedi-181717?logo=github)](https://github.com/ar-saeedi)

</div>

