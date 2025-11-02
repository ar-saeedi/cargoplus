import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  Store,
  Globe,
  ChevronDown
} from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useAuthStore } from '../store/authStore'

export default function VendorInternationalLayout() {
  const location = useLocation()
  const { user } = useAuthStore()
  const [dashboardLanguage, setDashboardLanguage] = useState('en')

  // Detect vendor's language from profile
  useEffect(() => {
    const vendorLang = user?.user_metadata?.language || 'en'
    setDashboardLanguage(vendorLang)
    // Set HTML dir to LTR for international dashboard
    document.documentElement.dir = 'ltr'
  }, [user])

  // Translations for dashboard menu
  const translations = {
    en: {
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      storePage: 'Store Page',
      sales: 'Sales',
      customers: 'Customers',
      settings: 'Settings',
      vendorCenter: 'Vendor Center',
      selectLanguage: 'Language',
    },
    zh: {
      dashboard: '仪表板',
      products: '产品',
      orders: '订单',
      storePage: '店铺页面',
      sales: '销售',
      customers: '客户',
      settings: '设置',
      vendorCenter: '卖家中心',
      selectLanguage: '语言',
    },
    ar: {
      dashboard: 'لوحة التحكم',
      products: 'المنتجات',
      orders: 'الطلبات',
      storePage: 'صفحة المتجر',
      sales: 'المبيعات',
      customers: 'العملاء',
      settings: 'الإعدادات',
      vendorCenter: 'مركز البائع',
      selectLanguage: 'اللغة',
    },
    tr: {
      dashboard: 'Panel',
      products: 'Ürünler',
      orders: 'Siparişler',
      storePage: 'Mağaza Sayfası',
      sales: 'Satışlar',
      customers: 'Müşteriler',
      settings: 'Ayarlar',
      vendorCenter: 'Satıcı Merkezi',
      selectLanguage: 'Dil',
    },
    ru: {
      dashboard: 'Панель',
      products: 'Товары',
      orders: 'Заказы',
      storePage: 'Страница магазина',
      sales: 'Продажи',
      customers: 'Клиенты',
      settings: 'Настройки',
      vendorCenter: 'Центр продавца',
      selectLanguage: 'Язык',
    }
  }

  const t = translations[dashboardLanguage] || translations.en

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ]

  const menuItems = [
    { path: '/vendor/international', label: t.dashboard, icon: LayoutDashboard },
    { path: '/vendor/international/products', label: t.products, icon: Package },
    { path: '/vendor/international/orders', label: t.orders, icon: ShoppingCart },
    { path: '/vendor/international/store-page', label: t.storePage, icon: Store },
    { path: '/vendor/international/sales', label: t.sales, icon: BarChart3 },
    { path: '/vendor/international/customers', label: t.customers, icon: Users },
    { path: '/vendor/international/settings', label: t.settings, icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir="ltr">
      <Header onMenuClick={() => {}} />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="card p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-lg font-bold text-left">
                  {t.vendorCenter}
                </h2>
                {/* Language Selector */}
                <div className="relative">
                  <select
                    value={dashboardLanguage}
                    onChange={(e) => setDashboardLanguage(e.target.value)}
                    className="appearance-none bg-white border rounded-lg px-3 py-1.5 text-sm pr-8 cursor-pointer"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" size={14} />
                </div>
              </div>

              {/* International Vendor Notice */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-left">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <Globe size={16} />
                  <span className="font-medium">International Vendor</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Dashboard in {languages.find(l => l.code === dashboardLanguage)?.name}
                </p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-9">
            <Outlet context={{ language: dashboardLanguage, translations: t }} />
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

