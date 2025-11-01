import { useTranslation } from 'react-i18next'

export default function VendorOrdersPage() {
  const { t } = useTranslation()

  const orders = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    customer: `مشتری ${i + 1}`,
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
      pending: 'در انتظار تایید',
    }
    return texts[status] || status
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-6">{t('vendor.orders')}</h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">شماره سفارش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">مشتری</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">تاریخ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">تعداد</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">مبلغ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm">{order.items} محصول</td>
                  <td className="px-4 py-3 text-sm font-medium">{order.total.toLocaleString('fa-IR')} تومان</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={getStatusBadge(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-primary-600 hover:text-primary-700">
                      مشاهده
                    </button>
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

