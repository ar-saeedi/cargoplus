import { useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, Store } from 'lucide-react'
import Logo from '../../components/Logo'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="lg" showText={true} />
        </Link>

        {/* Registration Type Selection */}
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-center mb-3">
            ثبت‌نام در CargoPlus
          </h1>
          <p className="text-gray-600 text-center mb-8">
            لطفا نوع حساب کاربری خود را انتخاب کنید
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buyer Registration */}
            <Link
              to="/auth/register/buyer"
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-primary-600 transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingBag className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  ثبت‌نام خریدار
                </h3>
                <p className="text-gray-600 mb-6">
                  برای خرید محصولات از فروشندگان مختلف
                </p>
                <ul className="text-right space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>خرید از هزاران فروشنده</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>مدیریت سفارشات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>لیست علاقه‌مندی‌ها</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>پیگیری سفارشات</span>
                  </li>
                </ul>
                <div className="btn btn-primary w-full group-hover:bg-blue-600">
                  ثبت‌نام به عنوان خریدار
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                B2C
              </div>
            </Link>

            {/* Vendor Registration */}
            <Link
              to="/auth/register/vendor"
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-primary-600 transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Store className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  ثبت‌نام فروشنده
                </h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                  Vendor Registration
                </h4>
                <p className="text-gray-600 mb-6">
                  برای فروش محصولات و راه‌اندازی فروشگاه آنلاین
                  <br />
                  <span className="text-sm">Sell globally, manage easily</span>
                </p>
                <ul className="text-right space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Create your online store</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>List unlimited products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Access Iranian market</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Multi-language dashboard</span>
                  </li>
                </ul>
                <div className="btn btn-primary w-full group-hover:bg-blue-700 bg-blue-600">
                  Start Selling
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                International
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center text-sm border-t pt-6">
            <span className="text-gray-600">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
              وارد شوید
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

