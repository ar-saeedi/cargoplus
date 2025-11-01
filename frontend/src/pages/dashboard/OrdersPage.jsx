import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function OrdersPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { key: 'all', label: 'همه سفارشات' },
    { key: 'pending', label: 'در انتظار پرداخت' },
    { key: 'processing', label: 'در حال پردازش' },
    { key: 'shipped', label: 'ارسال شده' },
    { key: 'delivered', label: 'تحویل داده شده' },
  ]

  const orders = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    date: '۱۴۰۲/۰۸/۱۵',
    items: 2 + (i % 3),
    total: 250000 + (i * 50000),
    status: ['pending', 'processing', 'shipped', 'delivered'][i % 4],
  }))

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
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-4">{t('order.title')}</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold text-lg">سفارش #{order.id}</span>
                  <span className="text-sm text-gray-600 mr-3">{order.date}</span>
                </div>
                <span className={getStatusBadge(order.status)}>
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {order.items} محصول • {order.total.toLocaleString('fa-IR')} تومان
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/orders/${order.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    مشاهده جزئیات
                  </Link>
                  {order.status === 'delivered' && (
                    <button className="btn btn-primary btn-sm">
                      خرید مجدد
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

