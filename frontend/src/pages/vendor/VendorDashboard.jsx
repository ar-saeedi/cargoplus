import { useTranslation } from 'react-i18next'
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'

export default function VendorDashboard() {
  const { t } = useTranslation()

  const stats = [
    { label: t('vendor.products'), value: '۴۵', icon: Package, color: 'bg-blue-500' },
    { label: t('vendor.orders'), value: '۲۳', icon: ShoppingCart, color: 'bg-green-500' },
    { label: t('vendor.revenue'), value: '۱۲.۵ میلیون', icon: DollarSign, color: 'bg-purple-500' },
    { label: t('vendor.sales'), value: '+۲۵٪', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-2">{t('vendor.dashboard')}</h1>
        <p className="text-gray-600">خوش آمدید به پنل فروشنده</p>
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
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4">آمار فروش اخیر</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">نمودار آماری در اینجا نمایش داده می‌شود</p>
        </div>
      </div>
    </div>
  )
}

