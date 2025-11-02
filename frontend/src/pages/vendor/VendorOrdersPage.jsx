import { useTranslation } from 'react-i18next'
import { useOutletContext, useLocation } from 'react-router-dom'

export default function VendorOrdersPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const context = useOutletContext()
  const isInternational = location.pathname.includes('/international')
  const language = context?.language || 'fa'

  const translations = {
    en: {
      orders: 'Orders',
      orderNumber: 'Order #',
      customer: 'Customer',
      date: 'Date',
      quantity: 'Quantity',
      amount: 'Amount',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      items: 'items',
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
    },
    zh: {
      orders: '订单',
      orderNumber: '订单号',
      customer: '客户',
      date: '日期',
      quantity: '数量',
      amount: '金额',
      status: '状态',
      actions: '操作',
      view: '查看',
      items: '件',
      pending: '待确认',
      processing: '处理中',
      shipped: '已发货',
      delivered: '已送达',
    },
    fa: {
      orders: 'سفارشات',
      orderNumber: 'شماره سفارش',
      customer: 'مشتری',
      date: 'تاریخ',
      quantity: 'تعداد',
      amount: 'مبلغ',
      status: 'وضعیت',
      actions: 'عملیات',
      view: 'مشاهده',
      items: 'محصول',
      pending: 'در انتظار تایید',
      processing: 'در حال پردازش',
      shipped: 'ارسال شده',
      delivered: 'تحویل داده شده',
    }
  }

  const txt = translations[language] || translations.fa
  const textDir = isInternational ? 'ltr' : 'rtl'
  const textAlign = isInternational ? 'text-left' : 'text-right'

  const orders = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    customer: isInternational ? `Customer ${i + 1}` : `مشتری ${i + 1}`,
    date: isInternational ? '2025-11-02' : '۱۴۰۲/۰۸/۱۵',
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
    return txt[status] || status
  }

  return (
    <div className="space-y-6" dir={textDir}>
      <div className={`card p-6 ${textAlign}`}>
        <h1 className="text-2xl font-bold mb-6">{txt.orders}</h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.orderNumber}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.customer}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.date}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.quantity}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.amount}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.status}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>#{order.id}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{order.customer}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{order.date}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{order.items} {txt.items}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${textAlign}`}>
                    {isInternational ? `$${order.total.toLocaleString()}` : `${order.total.toLocaleString('fa-IR')} تومان`}
                  </td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    <span className={getStatusBadge(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    <button className="text-primary-600 hover:text-primary-700">
                      {txt.view}
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

