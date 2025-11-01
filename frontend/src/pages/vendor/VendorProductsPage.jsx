import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export default function VendorProductsPage() {
  const { t } = useTranslation()

  const products = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول ${i + 1}`,
    price: 125000 + (i * 10000),
    stock: 50 + (i * 5),
    sales: 120 + (i * 10),
    status: i % 3 === 0 ? 'published' : 'draft',
  }))

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('vendor.products')}</h1>
            <p className="text-gray-600">مدیریت محصولات فروشگاه</p>
          </div>
          <Link to="/vendor/products/new" className="btn btn-primary">
            <Plus size={20} />
            {t('vendor.addProduct')}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">نام محصول</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">قیمت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">موجودی</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">فروش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.price.toLocaleString('fa-IR')} تومان</td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3 text-sm">{product.sales}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`badge ${product.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {product.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded" title="مشاهده">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-blue-50 rounded" title="ویرایش">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded" title="حذف">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
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

