import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, MapPin, TrendingUp } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function BuyerDashboard() {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const stats = [
    { label: 'سفارشات فعال', value: '۳', icon: ShoppingBag, color: 'bg-blue-500', link: '/dashboard/orders' },
    { label: 'محصولات مورد علاقه', value: '۱۲', icon: Heart, color: 'bg-red-500', link: '/dashboard/favorites' },
    { label: 'آدرس‌های ذخیره شده', value: '۲', icon: MapPin, color: 'bg-green-500', link: '/dashboard/addresses' },
    { label: 'مجموع خریدها', value: '۱۵', icon: TrendingUp, color: 'bg-purple-500', link: '/dashboard/orders' },
  ]

  const recentOrders = [
    { id: 1, date: '۱۴۰۲/۰۸/۱۵', total: 250000, status: 'delivered', items: 2 },
    { id: 2, date: '۱۴۰۲/۰۸/۱۲', total: 450000, status: 'shipped', items: 3 },
    { id: 3, date: '۱۴۰۲/۰۸/۱۰', total: 180000, status: 'processing', items: 1 },
  ]

  const getStatusBadge = (status) => {
    const styles = {
      delivered: 'badge badge-success',
      shipped: 'badge badge-info',
      processing: 'badge badge-warning',
      pending: 'badge badge-warning',
    }
    return styles[status] || 'badge'
  }

  const getStatusText = (status) => {
    const texts = {
      delivered: 'تحویل داده شده',
      shipped: 'ارسال شده',
      processing: 'در حال پردازش',
      pending: 'در انتظار پرداخت',
    }
    return texts[status] || status
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}, {user?.user_metadata?.full_name || 'کاربر'}!
        </h1>
        <p className="text-gray-600">
          به داشبورد خریدار خود خوش آمدید
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link 
              key={index}
              to={stat.link}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">سفارشات اخیر</h2>
          <Link to="/dashboard/orders" className="text-primary-600 hover:text-primary-700 text-sm">
            مشاهده همه
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">شماره سفارش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">تاریخ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">تعداد محصولات</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">مبلغ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm">{order.items} محصول</td>
                  <td className="px-4 py-3 text-sm font-medium">{order.total.toLocaleString('fa-IR')} تومان</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={getStatusBadge(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link to={`/dashboard/orders/${order.id}`} className="text-primary-600 hover:text-primary-700">
                      مشاهده
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

