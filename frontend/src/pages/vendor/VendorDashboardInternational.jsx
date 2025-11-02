import { Link, useOutletContext } from 'react-router-dom'
import { Package, ShoppingCart, DollarSign, TrendingUp, Store, Eye } from 'lucide-react'

export default function VendorDashboardInternational() {
  const { language = 'en', translations } = useOutletContext() || {}

  const dashboardTranslations = {
    en: {
      dashboard: 'Vendor Dashboard',
      welcome: 'Welcome to Vendor Panel',
      products: 'Products',
      orders: 'Orders',
      revenue: 'Revenue',
      sales: 'Sales',
      storePageTitle: 'Your Store Page',
      storePageDesc: 'Create a professional page for your store and gain customer trust',
      storeSettings: 'Store Settings',
      viewPublicPage: 'View Public Page',
      recentSales: 'Recent Sales Statistics',
      chartPlaceholder: 'Statistical chart will be displayed here',
    },
    zh: {
      dashboard: '卖家仪表板',
      welcome: '欢迎来到卖家面板',
      products: '产品',
      orders: '订单',
      revenue: '收入',
      sales: '销售',
      storePageTitle: '您的店铺页面',
      storePageDesc: '为您的店铺创建专业页面，赢得客户信任',
      storeSettings: '店铺设置',
      viewPublicPage: '查看公开页面',
      recentSales: '近期销售统计',
      chartPlaceholder: '统计图表将在这里显示',
    },
    ar: {
      dashboard: 'لوحة تحكم البائع',
      welcome: 'مرحبًا بك في لوحة البائع',
      products: 'المنتجات',
      orders: 'الطلبات',
      revenue: 'الإيرادات',
      sales: 'المبيعات',
      storePageTitle: 'صفحة متجرك',
      storePageDesc: 'أنشئ صفحة احترافية لمتجرك واكسب ثقة العملاء',
      storeSettings: 'إعدادات المتجر',
      viewPublicPage: 'عرض الصفحة العامة',
      recentSales: 'إحصائيات المبيعات الأخيرة',
      chartPlaceholder: 'سيتم عرض الرسم البياني الإحصائي هنا',
    }
  }

  const t = dashboardTranslations[language] || dashboardTranslations.en

  const stats = [
    { label: t.products, value: '45', icon: Package, color: 'bg-blue-500' },
    { label: t.orders, value: '23', icon: ShoppingCart, color: 'bg-green-500' },
    { label: t.revenue, value: '12.5M', icon: DollarSign, color: 'bg-purple-500' },
    { label: t.sales, value: '+25%', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6" dir="ltr">
      <div className="card p-6 text-left">
        <h1 className="text-2xl font-bold mb-2">{t.dashboard}</h1>
        <p className="text-gray-600">{t.welcome}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Store Page Quick Access */}
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-orange-50 border-2 border-primary-200">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Store size={24} className="text-primary-600" />
              {t.storePageTitle}
            </h3>
            <p className="text-gray-700 mb-4">
              {t.storePageDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/vendor/international/store-page" className="btn btn-primary">
                <Store size={18} />
                {t.storeSettings}
              </Link>
              <Link to="/store/preview" target="_blank" className="btn btn-outline">
                <Eye size={18} />
                {t.viewPublicPage}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block text-6xl">
            🏪
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 text-left">{t.recentSales}</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">{t.chartPlaceholder}</p>
        </div>
      </div>
    </div>
  )
}

