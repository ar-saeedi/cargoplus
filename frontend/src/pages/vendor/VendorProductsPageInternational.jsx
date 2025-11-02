import { Link, useOutletContext } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export default function VendorProductsPageInternational() {
  const { language = 'en' } = useOutletContext() || {}

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
    }
  }

  const t = translations[language] || translations.en

  const products = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 125000 + (i * 10000),
    stock: 50 + (i * 5),
    sales: 120 + (i * 10),
    status: i % 3 === 0 ? 'published' : 'draft',
  }))

  return (
    <div className="space-y-6" dir="ltr">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h1 className="text-2xl font-bold mb-2">{t.myProducts}</h1>
            <p className="text-gray-600">{t.manageProducts}</p>
          </div>
          <Link to="/vendor/international/products/new" className="btn btn-primary">
            <Plus size={20} />
            {t.addProduct}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.productName}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.price}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.stock}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.sales}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.status}</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-left">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-left">${product.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-left">{product.stock}</td>
                  <td className="px-4 py-3 text-sm text-left">{product.sales}</td>
                  <td className="px-4 py-3 text-sm text-left">
                    <span className={`badge ${product.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {product.status === 'published' ? t.published : t.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded" title="View">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-blue-50 rounded" title="Edit">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded" title="Delete">
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

