import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus, Minus, ShoppingBag, Globe, Truck, Store } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { getCartItems, updateCartQuantity, removeFromCart } from '../../services/cartService'
import { calculateShipping } from '../../services/cartService'
import { formatPrice } from '../../utils/helpers'

export default function CartPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadCart()
  }, [user])

  const loadCart = async () => {
    if (!user) return
    
    setLoading(true)
    const result = await getCartItems(user.id)
    if (result.success) {
      setCartItems(result.data || [])
    }
    setLoading(false)
  }

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(cartItemId)
      return
    }
    
    setUpdating(true)
    const result = await updateCartQuantity(cartItemId, newQuantity)
    if (result.success) {
      await loadCart()
    }
    setUpdating(false)
  }

  const handleRemoveItem = async (cartItemId) => {
    setUpdating(true)
    const result = await removeFromCart(cartItemId)
    if (result.success) {
      await loadCart()
    }
    setUpdating(false)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingInfo = calculateShipping(cartItems)
  const total = subtotal + shippingInfo.totalShipping

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>در حال بارگذاری سبد خرید...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
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

  const groupedByVendor = cartItems.reduce((groups, item) => {
    const vendorId = item.vendor_id
    if (!groups[vendorId]) {
      groups[vendorId] = {
        vendor: item.vendor,
        items: []
      }
    }
    groups[vendorId].items.push(item)
    return groups
  }, {})

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">{t('cart.title')}</h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {Object.values(groupedByVendor).map((group) => (
              <div key={group.vendor?.id} className="card p-4">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                  <Store size={20} className="text-primary-600" />
                  <h3 className="font-bold">{group.vendor?.company_name || 'فروشنده'}</h3>
                  {group.vendor?.is_international && (
                    <span className="badge badge-info text-xs">
                      <Globe size={12} className="inline mr-1" />
                      {group.vendor?.country || 'بین‌المللی'}
                    </span>
                  )}
                </div>
                {group.items.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 last:mb-0">
                    <Link 
                      to={`/products/${item.product_id}`}
                      className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      {item.product?.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product.name_fa} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      )}
                    </Link>

                    <div className="flex-1">
                      <Link 
                        to={`/products/${item.product_id}`}
                        className="font-medium hover:text-primary-600 mb-2 line-clamp-2 block"
                      >
                        {item.product?.name_fa || item.product?.name}
                      </Link>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updating}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updating}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={updating}
                            className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                            title={t('cart.remove')}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

