import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export default function VendorProductsPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const context = useOutletContext()
  const isInternational = location.pathname.includes('/international')
  const language = context?.language || 'fa'

  const translations = {
    en: {
      myProducts: 'My Products',
      manageProducts: 'Manage your store products',
      addProduct: 'Add Product',
      productName: 'Product Name',
      price: 'Price',
      stock: 'Stock',
      sales: 'Sales',
      status: 'Status',
      actions: 'Actions',
      published: 'Published',
      draft: 'Draft',
    },
    zh: {
      myProducts: '我的产品',
      manageProducts: '管理您的店铺产品',
      addProduct: '添加产品',
      productName: '产品名称',
      price: '价格',
      stock: '库存',
      sales: '销售',
      status: '状态',
      actions: '操作',
      published: '已发布',
      draft: '草稿',
    },
    fa: {
      myProducts: 'محصولات من',
      manageProducts: 'مدیریت محصولات فروشگاه',
      addProduct: 'افزودن محصول',
      productName: 'نام محصول',
      price: 'قیمت',
      stock: 'موجودی',
      sales: 'فروش',
      status: 'وضعیت',
      actions: 'عملیات',
      published: 'منتشر شده',
      draft: 'پیش‌نویس',
    }
  }

  const txt = translations[language] || translations.fa
  const textDir = isInternational ? 'ltr' : 'rtl'
  const textAlign = isInternational ? 'text-left' : 'text-right'
  const basePath = isInternational ? '/vendor/international' : '/vendor'

  const products = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول ${i + 1}`,
    price: 125000 + (i * 10000),
    stock: 50 + (i * 5),
    sales: 120 + (i * 10),
    status: i % 3 === 0 ? 'published' : 'draft',
  }))

  return (
    <div className="space-y-6" dir={textDir}>
      <div className={`card p-6 ${textAlign}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{txt.myProducts}</h1>
            <p className="text-gray-600">{txt.manageProducts}</p>
          </div>
          <Link to={`${basePath}/products/new`} className="btn btn-primary">
            <Plus size={20} />
            {txt.addProduct}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.productName}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.price}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.stock}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.sales}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.status}</th>
                <th className={`px-4 py-3 ${textAlign} text-sm font-medium text-gray-700`}>{txt.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className={`px-4 py-3 text-sm font-medium ${textAlign}`}>{product.name}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    {isInternational ? `$${product.price.toLocaleString()}` : `${product.price.toLocaleString('fa-IR')} تومان`}
                  </td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{product.stock}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{product.sales}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    <span className={`badge ${product.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {product.status === 'published' ? txt.published : txt.draft}
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

