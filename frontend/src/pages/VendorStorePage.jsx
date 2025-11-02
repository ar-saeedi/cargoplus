import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, Store, Package, TrendingUp, Shield } from 'lucide-react'
import { useState } from 'react'

export default function VendorStorePage() {
  const { vendorId } = useParams()
  const [activeTab, setActiveTab] = useState('products')

  // Mock vendor data - Will come from Supabase
  const vendor = {
    id: vendorId,
    companyName: 'شرکت تجاری نمونه',
    businessType: 'عمده‌فروش',
    description: 'ما یک شرکت معتبر در زمینه توزیع و فروش محصولات متنوع هستیم با بیش از ۱۰ سال سابقه فعالیت در بازار.',
    rating: 4.8,
    reviewsCount: 234,
    productsCount: 156,
    city: 'تهران',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    phone: '021-12345678',
    email: 'info@company.com',
    joinDate: '۱۴۰۱',
    totalSales: 15420,
    responseTime: '۲ ساعت',
    logo: null,
    coverImage: null,
  }

  // Mock products - Will come from Supabase
  const products = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول ${i + 1} از ${vendor.companyName}`,
    price: 125000 + (i * 10000),
    rating: 4.5,
    sales: 120 + (i * 10),
    inStock: i % 4 !== 0,
  }))

  const tabs = [
    { key: 'products', label: 'محصولات', count: vendor.productsCount },
    { key: 'about', label: 'درباره فروشگاه' },
    { key: 'reviews', label: 'نظرات', count: vendor.reviewsCount },
  ]

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">خانه</Link>
            <span>/</span>
            <Link to="/vendors" className="hover:text-primary-600">فروشندگان</Link>
            <span>/</span>
            <span className="text-gray-900">{vendor.companyName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Store Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Store className="text-white" size={48} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{vendor.companyName}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span>({vendor.reviewsCount} نظر)</span>
                    </div>
                    <span>•</span>
                    <span>{vendor.totalSales.toLocaleString('fa-IR')} فروش</span>
                    <span>•</span>
                    <span>عضو از {vendor.joinDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-outline">
                    + دنبال کردن
                  </button>
                  <button className="btn btn-secondary">
                    تماس با فروشنده
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{vendor.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{vendor.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span dir="ltr">{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package size={16} className="text-gray-400" />
                  <span>{vendor.productsCount} محصول</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="text-gray-400" />
                  <span>پاسخگویی: {vendor.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="text-green-500" size={20} />
              <span>فروشنده تایید شده</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="text-blue-500" size={20} />
              <span>ارسال سریع</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              <span>امتیاز عالی</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="border-b">
            <div className="flex gap-6 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary-600 text-primary-600 font-medium'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span className="mr-1 text-sm">({tab.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="card overflow-hidden group"
                  >
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-primary-600 mb-2">
                        {product.price.toLocaleString('fa-IR')} تومان
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sales} فروش
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-bold mb-4">درباره {vendor.companyName}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{vendor.description}</p>
                
                <h4 className="font-bold mb-3">اطلاعات تماس</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{vendor.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gray-400" />
                    <span dir="ltr">{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gray-400" />
                    <span dir="ltr">{vendor.email}</span>
                  </div>
                </div>

                <h4 className="font-bold mb-3 mt-6">نوع کسب‌وکار</h4>
                <p className="text-gray-700">{vendor.businessType}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <p className="text-gray-600 text-center py-8">
                  بخش نظرات به زودی فعال می‌شود
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

