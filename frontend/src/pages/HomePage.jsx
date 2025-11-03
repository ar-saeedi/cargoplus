import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Truck, 
  Shield, 
  CreditCard,
  ArrowLeft,
  Star,
  Package
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function HomePage() {
  const { t } = useTranslation()

  // Mock data - در نسخه نهایی از API دریافت می‌شود
  const banners = [
    { id: 1, title: 'فروش ویژه پاییزه', subtitle: 'تا ۷۰٪ تخفیف', image: '/images/banner1.jpg', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    { id: 2, title: 'محصولات صنعتی', subtitle: 'با بهترین قیمت', image: '/images/banner2.jpg', color: 'bg-gradient-to-r from-blue-600 to-cyan-600' },
    { id: 3, title: 'ارسال رایگان', subtitle: 'برای خریدهای بالای ۵۰۰ هزار تومان', image: '/images/banner3.jpg', color: 'bg-gradient-to-r from-green-600 to-teal-600' },
  ]

  const categories = [
    { id: 1, name: t('category.womenClothing'), icon: '👗', link: '/products?category=women', color: 'bg-pink-100' },
    { id: 2, name: t('category.menClothing'), icon: '👔', link: '/products?category=men', color: 'bg-blue-100' },
    { id: 3, name: t('category.electronics'), icon: '📱', link: '/products?category=electronics', color: 'bg-purple-100' },
    { id: 4, name: t('category.shoes'), icon: '👟', link: '/products?category=shoes', color: 'bg-orange-100' },
    { id: 5, name: t('category.bags'), icon: '👜', link: '/products?category=bags', color: 'bg-red-100' },
    { id: 6, name: t('category.homeAppliances'), icon: '🏠', link: '/products?category=home', color: 'bg-green-100' },
    { id: 7, name: t('category.sports'), icon: '⚽', link: '/products?category=sports', color: 'bg-yellow-100' },
    { id: 8, name: t('category.toys'), icon: '🧸', link: '/products?category=toys', color: 'bg-indigo-100' },
  ]

  const featuredProducts = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول نمونه ${i + 1}`,
    price: 125000 + (i * 10000),
    originalPrice: 150000 + (i * 10000),
    image: '/images/product.jpg',
    rating: 4.5,
    sales: 1200 + (i * 100),
    vendor: `فروشگاه ${i + 1}`,
  }))

  const features = [
    { icon: Truck, title: t('homepage.fastDelivery'), description: 'ارسال سریع به سراسر کشور' },
    { icon: Shield, title: t('homepage.qualityGuarantee'), description: 'ضمانت اصالت و کیفیت کالا' },
    { icon: CreditCard, title: t('homepage.securePayment'), description: 'پرداخت امن و آسان' },
    { icon: Package, title: t('homepage.oneStopShop'), description: 'خرید یکجا از هزاران فروشنده' },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <section className="container mx-auto px-4 pt-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="rounded-2xl overflow-hidden"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className={`${banner.color} h-64 md:h-80 lg:h-96 flex items-center justify-center text-white p-6 md:p-12 rounded-2xl`}>
                <div className="text-center">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{banner.title}</h2>
                  <p className="text-base md:text-xl lg:text-2xl mb-4 md:mb-6">{banner.subtitle}</p>
                  <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100 text-sm md:text-base lg:text-lg px-6 md:px-8">
                    همین حالا خرید کنید
                    <ArrowLeft className="rtl-flip" size={18} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{t('homepage.popularCategories')}</h2>
          <Link to="/products" className="text-sm md:text-base text-primary-600 hover:text-primary-700 flex items-center gap-1">
            مشاهده همه
            <ArrowLeft size={16} className="md:w-5 md:h-5 rtl-flip" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className={`${category.color} rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-shadow`}
            >
              <div className="text-3xl md:text-4xl mb-1 md:mb-2">{category.icon}</div>
              <div className="text-xs md:text-sm font-medium text-gray-800">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/products?special=flash" className="card overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 text-white p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2">فروش ویژه</h3>
            <p className="text-sm mb-4">تا ۶۰٪ تخفیف</p>
            <span className="text-xs">مشاهده محصولات →</span>
          </Link>
          <Link to="/products?special=new" className="card overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2">تازه‌های فروشگاه</h3>
            <p className="text-sm mb-4">محصولات جدید</p>
            <span className="text-xs">مشاهده محصولات →</span>
          </Link>
          <Link to="/products?special=trending" className="card overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2">پرفروش‌ترین‌ها</h3>
            <p className="text-sm mb-4">محصولات محبوب</p>
            <span className="text-xs">مشاهده محصولات →</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{t('homepage.featuredProducts')}</h2>
          <Link to="/products" className="text-sm md:text-base text-primary-600 hover:text-primary-700 flex items-center gap-1">
            مشاهده همه
            <ArrowLeft size={16} className="md:w-5 md:h-5 rtl-flip" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
          {featuredProducts.map((product) => (
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
                  <span className="text-xs text-gray-500">({product.sales} فروش)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary-600">
                    {product.price.toLocaleString('fa-IR')} تومان
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">{product.vendor}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-primary-600" size={32} />
            <h2 className="text-2xl font-bold">{t('homepage.trendingProducts')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="card overflow-hidden group"
              >
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-sm font-bold text-primary-600">
                    {product.price.toLocaleString('fa-IR')} تومان
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">می‌خواهید فروشنده شوید؟</h2>
          <p className="text-lg mb-6">به بزرگترین بازار آنلاین ایران بپیوندید و محصولات خود را به فروش برسانید</p>
          <Link to="/vendor/register" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8">
            همین حالا شروع کنید
            <ArrowLeft className="rtl-flip" />
          </Link>
        </div>
      </section>
    </div>
  )
}

