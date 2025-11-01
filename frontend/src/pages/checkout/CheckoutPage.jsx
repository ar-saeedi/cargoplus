import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/helpers'

export default function CheckoutPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'online',
    notes: '',
  })

  const subtotal = getTotalPrice()
  const shipping = 30000
  const total = subtotal + shipping

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate order processing
    setTimeout(() => {
      clearCart()
      navigate('/dashboard/orders')
    }, 2000)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">تکمیل خرید</h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Form */}
          <div className="col-span-12 lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="card p-6">
                <h2 className="font-bold text-lg mb-4">آدرس تحویل</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group md:col-span-2">
                    <label className="input-label">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">شماره تماس</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      dir="ltr"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">شهر</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group md:col-span-2">
                    <label className="input-label">آدرس کامل</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">کد پستی</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="font-bold text-lg mb-4">روش پرداخت</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                    />
                    <div className="flex-1">
                      <div className="font-medium">پرداخت آنلاین</div>
                      <div className="text-sm text-gray-600">پرداخت امن با درگاه بانکی</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <div className="flex-1">
                      <div className="font-medium">پرداخت در محل</div>
                      <div className="text-sm text-gray-600">پرداخت هنگام تحویل کالا</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="card p-6">
                <h2 className="font-bold text-lg mb-4">یادداشت سفارش (اختیاری)</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="توضیحات اضافی در مورد سفارش خود را اینجا بنویسید..."
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="card p-6 sticky top-4">
              <h2 className="font-bold text-lg mb-4">خلاصه سفارش</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-2">{item.name}</div>
                      <div className="text-sm text-gray-600">تعداد: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">جمع جزء</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">هزینه ارسال</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold">مجموع</span>
                <span className="font-bold text-lg text-primary-600">{formatPrice(total)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'در حال پردازش...' : 'تکمیل خرید'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

