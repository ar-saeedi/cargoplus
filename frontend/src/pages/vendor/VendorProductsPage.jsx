import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'

export default function VendorProductsPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
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

  // Load real products from Supabase
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Get vendor ID first
        const { data: vendor } = await supabase
          .from('vendors')
          .select('id')
          .eq('user_id', user?.id)
          .single()

        if (vendor) {
          // Load vendor's products
          const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .eq('vendor_id', vendor.id)
            .order('created_at', { ascending: false })

          if (productsData) {
            setProducts(productsData)
          }
        }
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setProductsLoading(false)
      }
    }

    if (user) {
      loadProducts()
    }
  }, [user])

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>{language === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

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

        {products.length === 0 ? (
          <div className={`text-center py-12 ${textAlign}`}>
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'fa' ? 'هنوز محصولی اضافه نکرده‌اید' : 'No products yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'fa' ? 'اولین محصول خود را اضافه کنید' : 'Add your first product to start selling'}
            </p>
            <Link to={`${basePath}/products/new`} className="btn btn-primary">
              <Plus size={20} />
              {txt.addProduct}
            </Link>
          </div>
        ) : (
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
                  <td className={`px-4 py-3 text-sm font-medium ${textAlign}`}>
                    {isInternational ? (product.name_original || product.name) : (product.name_fa || product.name)}
                  </td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    {isInternational ? `$${product.price?.toLocaleString()}` : `${product.price?.toLocaleString('fa-IR')} تومان`}
                  </td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{product.stock || 0}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>{product.sales_count || 0}</td>
                  <td className={`px-4 py-3 text-sm ${textAlign}`}>
                    <span className={`badge ${product.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {product.status === 'published' ? txt.published : txt.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded" title={language === 'fa' ? 'مشاهده' : 'View'}>
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-blue-50 rounded" title={language === 'fa' ? 'ویرایش' : 'Edit'}>
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-50 rounded" title={language === 'fa' ? 'حذف' : 'Delete'}>
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}

