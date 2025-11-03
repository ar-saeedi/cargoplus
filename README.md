# 🚚 CargoPlus | بازار آنلاین فارسی

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8.svg?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ecf8e.svg?logo=supabase)
![RTL](https://img.shields.io/badge/RTL-Supported-success.svg)

یک پلتفرم جامع بازار آنلاین B2B و B2C به زبان فارسی با پشتیبانی کامل از RTL

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

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Yarn or npm
- Supabase account

### Installation

1. **Install Dependencies**
\`\`\`bash
yarn install
\`\`\`

2. **Configure Environment Variables**

Create `.env` file in `frontend` folder:
\`\`\`env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:9000
\`\`\`

Create `.env` file in `backend` folder:
\`\`\`env
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
\`\`\`

3. **Run Development Server**
\`\`\`bash
yarn dev
\`\`\`

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:9000

## 📁 Project Structure

\`\`\`
cargoplus-marketplace/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── lib/             # Third-party integrations
│   │   ├── store/           # State management (Zustand)
│   │   ├── utils/           # Utility functions
│   │   └── locales/         # i18n translation files
│   └── public/              # Static assets
├── backend/                  # MedusaJS Backend (Future)
│   ├── src/
│   │   ├── api/             # API routes
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   └── subscribers/     # Event handlers
│   └── medusa-config.js
├── README.md
├── SETUP.md                  # Detailed setup guide
├── DEPLOYMENT.md             # Production deployment guide
└── package.json
\`\`\`

## 📄 License

**Proprietary License - All Rights Reserved**

© 2025 CargoPlus Co. All Rights Reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software, via any medium, is strictly prohibited without explicit written permission from CargoPlus Co.

**Developer:** Alireza Saeedi - Fullstack Developer Lead

For licensing inquiries, contact: alirezasaeediofficial@gmail.com

See the [LICENSE](LICENSE) file for complete details.

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. **Fork the repository**
2. **Create a new branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

## 💬 Support & Contact

For questions, suggestions, or issues:

- 📧 Email: [alirezasaeediofficial@gmail.com](mailto:alirezasaeediofficial@gmail.com)
- 💬 Telegram: [@AR_Saeedi](https://t.me/AR_Saeedi)
- 📱 WhatsApp: [+98 991 061 5570](https://wa.me/989910615570)

---

<div align="center">

**Made with ❤️ by Alireza Saeedi**

[![GitHub](https://img.shields.io/badge/GitHub-ar--saeedi-181717?logo=github)](https://github.com/ar-saeedi)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-0A66C2?logo=google-chrome&logoColor=white)](https://github.com/ar-saeedi)

⭐ **Star this repo if you find it helpful!**

</div>

