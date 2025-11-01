import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Filter, Grid, List, Star, Heart, X } from 'lucide-react'

export default function ProductListPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: 'popular'
  })

  // Mock products - در نسخه نهایی از API دریافت می‌شود
  const products = Array(24).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول نمونه شماره ${i + 1}`,
    price: 125000 + (i * 15000),
    originalPrice: 180000 + (i * 15000),
    image: '/images/product.jpg',
    rating: 4.5 - (i % 5) * 0.2,
    reviews: 120 + (i * 10),
    sales: 1200 + (i * 100),
    vendor: `فروشگاه ${i + 1}`,
    discount: 20 + (i % 4) * 5,
    inStock: i % 8 !== 0,
  }))

  const categories = [
    { id: 'women', name: t('category.womenClothing'), count: 1234 },
    { id: 'men', name: t('category.menClothing'), count: 982 },
    { id: 'electronics', name: t('category.electronics'), count: 756 },
    { id: 'shoes', name: t('category.shoes'), count: 645 },
    { id: 'bags', name: t('category.bags'), count: 523 },
    { id: 'home', name: t('category.homeAppliances'), count: 411 },
    { id: 'sports', name: t('category.sports'), count: 389 },
    { id: 'toys', name: t('category.toys'), count: 298 },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">خانه</Link>
            <span>/</span>
            <span className="text-gray-900">محصولات</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-6 sticky top-20 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b">
                <Filter size={20} />
                <h2 className="font-bold">فیلترها</h2>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">دسته‌بندی</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm flex-1">{category.name}</span>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">محدوده قیمت (تومان)</h3>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="از"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full text-sm"
                  />
                  <input
                    type="number"
                    placeholder="تا"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-medium mb-3">امتیاز</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === String(rating)}
                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                        className="w-4 h-4"
                      />
                      <div className="flex items-center gap-1">
                        {Array(rating).fill(0).map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm">و بالاتر</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary w-full">
                اعمال فیلتر
              </button>
            </div>
          </aside>

          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              />
              <aside className="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary-600 to-primary-500 text-white">
                  <h2 className="font-bold text-xl">فیلترها</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">دسته‌بندی</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="radio"
                            name="category-mobile"
                            value={category.id}
                            checked={filters.category === category.id}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span className="text-sm flex-1">{category.name}</span>
                          <span className="text-xs text-gray-500">({category.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">محدوده قیمت (تومان)</h3>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="از"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="w-full text-sm"
                      />
                      <input
                        type="number"
                        placeholder="تا"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="w-full text-sm"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium mb-3">امتیاز</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="radio"
                            name="rating-mobile"
                            value={rating}
                            checked={filters.rating === String(rating)}
                            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-1">
                            {Array(rating).fill(0).map((_, i) => (
                              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm">و بالاتر</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    اعمال فیلتر
                  </button>
                </div>
              </aside>
            </>
          )}

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn btn-outline flex items-center gap-2"
                >
                  <Filter size={20} />
                  <span>فیلترها</span>
                </button>
                <span className="text-sm text-gray-600">
                  نمایش {products.length} محصول
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="text-sm"
                >
                  <option value="popular">محبوب‌ترین</option>
                  <option value="newest">جدیدترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="rating">بیشترین امتیاز</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
                  title="نمایش شبکه‌ای"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
                  title="نمایش لیستی"
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-4'
            }>
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className={`card overflow-hidden group ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                >
                  {/* Image */}
                  <div className={`bg-gray-200 overflow-hidden relative ${
                    viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48 flex-shrink-0'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-110 transition-transform duration-300" />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                          ناموجود
                        </span>
                      </div>
                    )}
                    <button className="absolute top-2 left-2 p-2 bg-white rounded-full hover:bg-primary-50 transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews} نظر)</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-primary-600">
                        {product.price.toLocaleString('fa-IR')} تومان
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString('fa-IR')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{product.vendor}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.sales.toLocaleString('fa-IR')} فروش
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">قبلی</button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">بعدی</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

