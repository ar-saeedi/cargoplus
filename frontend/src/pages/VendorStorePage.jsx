import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, Store, Package, TrendingUp, Shield, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getVendorById } from '../services/vendorService'
import { supabase } from '../lib/supabase'

export default function VendorStorePage() {
  const { vendorId } = useParams()
  const [activeTab, setActiveTab] = useState('products')
  const [vendor, setVendor] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVendorData = async () => {
      setLoading(true)
      
      // Load vendor profile
      const vendorResult = await getVendorById(vendorId)
      if (vendorResult.success && vendorResult.data) {
        const vendorData = vendorResult.data
        
        // Transform to display object - ALWAYS SHOW PERSIAN to buyers!
        setVendor({
          id: vendorData.id,
          // Use Persian translations for buyers
          companyName: vendorData.description_fa || vendorData.company_name,
          displayName: vendorData.display_name_fa || vendorData.display_name || vendorData.company_name,
          slogan: vendorData.slogan_fa || vendorData.slogan,
          description: vendorData.description_fa || vendorData.description || 'بدون توضیحات',
          businessType: vendorData.business_type,
          rating: vendorData.rating || 0,
          reviewsCount: vendorData.reviews_count || 0,
          totalSales: vendorData.total_sales || 0,
          city: vendorData.city,
          country: vendorData.country,
          address: vendorData.address,
          phone: vendorData.phone,
          email: vendorData.email,
          whatsapp: vendorData.whatsapp,
          telegram: vendorData.telegram,
          website: vendorData.website,
          instagram: vendorData.instagram,
          isInternational: vendorData.is_international,
          isVerified: vendorData.is_verified,
          logo: vendorData.logo_url,
          coverImage: vendorData.cover_image_url,
          responseTime: vendorData.response_time || '۲۴ ساعت',
          joinDate: new Date(vendorData.created_at).toLocaleDateString('fa-IR', { year: 'numeric' }),
        })

        // Load vendor's products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('vendor_id', vendorId)
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(12)

        if (productsData) {
          setProducts(productsData.map(p => ({
            id: p.id,
            // Show Persian name to buyers
            name: p.name_fa || p.name,
            price: p.price,
            originalPrice: p.original_price,
            rating: p.rating || 4.5,
            sales: p.sales_count || 0,
            inStock: p.is_in_stock,
            image: p.images?.[0] || null,
          })))
        }
      }
      
      setLoading(false)
    }

    if (vendorId) {
      loadVendorData()
    }
  }, [vendorId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری فروشگاه...</p>
        </div>
      </div>
    )
  }

  if (!loading && !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Store size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">فروشگاه یافت نشد</h2>
          <p className="text-gray-600 mb-6">
            این فروشگاه هنوز ایجاد نشده است یا در دسترس نیست
          </p>
          <Link to="/" className="btn btn-primary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'products', label: 'محصولات', count: products?.length || 0 },
    { key: 'about', label: 'درباره فروشگاه' },
    { key: 'reviews', label: 'نظرات', count: vendor?.reviewsCount || 0 },
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
          {/* Cover Image */}
        {vendor.coverImage && (
          <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden mb-6">
            <img 
              src={vendor.coverImage} 
              alt={vendor.companyName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

          {/* Store Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              {vendor.logo ? (
                <img 
                  src={vendor.logo} 
                  alt={vendor.companyName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-200 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Store className="text-white" size={48} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {vendor.displayName || vendor.companyName}
                  </h1>
                  {vendor.slogan && (
                    <p className="text-gray-600 text-sm mb-2 italic">{vendor.slogan}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                    {vendor.isInternational && (
                      <>
                        <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          <Globe size={14} />
                          <span className="font-medium">فروشنده بین‌المللی</span>
                        </div>
                        <span>•</span>
                      </>
                    )}
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating.toFixed(1)}</span>
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

