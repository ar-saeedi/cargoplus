import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/helpers'

export default function CartPage() {
  const { t } = useTranslation()
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{t('cart.empty')}</h2>
          <p className="text-gray-600 mb-6">
            هنوز محصولی به سبد خرید خود اضافه نکرده‌اید
          </p>
          <Link to="/products" className="btn btn-primary">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">{t('cart.title')}</h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <Link 
                    to={`/products/${item.id}`}
                    className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1">
                    <Link 
                      to={`/products/${item.id}`}
                      className="font-medium hover:text-primary-600 mb-2 line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-600 mb-3">
                      فروشنده: {item.vendor || 'فروشگاه تست'}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title={t('cart.remove')}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="card p-6 sticky top-4">
              <h2 className="font-bold text-lg mb-4">{t('order.orderSummary')}</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 500000 && (
                  <div className="text-xs text-blue-600">
                    برای ارسال رایگان {formatPrice(500000 - subtotal)} تومان دیگر خرید کنید
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold">{t('cart.total')}</span>
                <span className="font-bold text-lg text-primary-600">
                  {formatPrice(total)}
                </span>
              </div>

              <Link to="/checkout" className="btn btn-primary w-full mb-3">
                {t('cart.checkout')}
              </Link>

              <Link to="/products" className="btn btn-secondary w-full">
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

