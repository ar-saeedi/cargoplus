import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'

export default function FavoritesPage() {
  const { t } = useTranslation()

  // Mock favorites
  const favorites = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول مورد علاقه ${i + 1}`,
    price: 125000 + (i * 10000),
    rating: 4.5,
    inStock: i % 4 !== 0,
  }))

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-4">{t('nav.favorites')}</h1>
        <p className="text-gray-600 mb-6">
          {favorites.length} محصول در لیست علاقه‌مندی‌های شما
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <div key={product.id} className="card overflow-hidden group relative">
              <button className="absolute top-2 left-2 z-10 p-2 bg-white rounded-full hover:bg-red-50 text-red-600 transition-colors">
                <Trash2 size={18} />
              </button>

              <Link to={`/products/${product.id}`}>
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>

              <div className="p-4">
                <Link 
                  to={`/products/${product.id}`}
                  className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600"
                >
                  {product.name}
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="text-lg font-bold text-primary-600 mb-3">
                  {product.price.toLocaleString('fa-IR')} تومان
                </div>

                {product.inStock ? (
                  <button className="btn btn-primary w-full btn-sm">
                    <ShoppingCart size={16} />
                    افزودن به سبد
                  </button>
                ) : (
                  <button disabled className="btn btn-secondary w-full btn-sm">
                    ناموجود
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

