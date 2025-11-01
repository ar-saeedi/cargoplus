import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, Share2, Star, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product - در نسخه نهایی از API دریافت می‌شود
  const product = {
    id,
    name: 'محصول نمونه با کیفیت عالی',
    price: 250000,
    originalPrice: 350000,
    rating: 4.7,
    reviews: 234,
    sales: 1543,
    inStock: true,
    minOrder: 1,
    vendor: {
      name: 'فروشگاه تست',
      rating: 4.8,
      products: 156,
      responseTime: '۲ ساعت',
    },
    description: 'توضیحات کامل محصول در این بخش قرار می‌گیرد. این یک محصول نمونه با کیفیت عالی و قیمت مناسب است که برای استفاده‌های مختلف مناسب می‌باشد.',
    specifications: [
      { label: 'برند', value: 'برند نمونه' },
      { label: 'کشور سازنده', value: 'ایران' },
      { label: 'ابعاد', value: '۱۰×۲۰×۳۰ سانتی‌متر' },
      { label: 'وزن', value: '۵۰۰ گرم' },
    ],
    images: ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg'],
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    // نمایش پیام موفقیت
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">خانه</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">محصولات</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Product Images */}
          <div className="col-span-12 lg:col-span-5">
            <div className="card p-4 sticky top-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="card p-6">
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} نظر)
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {product.sales.toLocaleString('fa-IR')} فروش
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {product.price.toLocaleString('fa-IR')} تومان
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice.toLocaleString('fa-IR')}
                </span>
                <span className="badge badge-danger">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% تخفیف
                </span>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <span className="font-medium">تعداد:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    (حداقل سفارش: {product.minOrder})
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1"
                >
                  <ShoppingCart size={20} />
                  {t('product.addToCart')}
                </button>
                <button className="btn btn-outline">
                  <Heart size={20} />
                </button>
                <button className="btn btn-outline">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>موجود در انبار</span>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="card p-6">
              <h3 className="font-bold mb-4">اطلاعات فروشنده</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-2">{product.vendor.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span>{product.vendor.rating}</span>
                    </div>
                    <span>{product.vendor.products} محصول</span>
                    <span>پاسخگویی: {product.vendor.responseTime}</span>
                  </div>
                </div>
                <Link to={`/vendors/${product.id}`} className="btn btn-outline">
                  مشاهده فروشگاه
                </Link>
              </div>
            </div>

            {/* Description & Specs */}
            <div className="card p-6">
              <h3 className="font-bold mb-4">توضیحات محصول</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              <h3 className="font-bold mb-4">مشخصات فنی</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex py-2 border-b last:border-0">
                    <span className="w-1/3 text-gray-600">{spec.label}</span>
                    <span className="flex-1 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

