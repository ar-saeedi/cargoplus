import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/authStore'
import { Mail, Lock, User as UserIcon, Phone, ShoppingBag } from 'lucide-react'
import Logo from '../../components/Logo'

export default function RegisterBuyerPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'نام و نام خانوادگی الزامی است'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تماس الزامی است'
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره تماس معتبر نیست'
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است'
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور مطابقت ندارد'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'باید قوانین و مقررات را بپذیرید'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { error } = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        userType: 'buyer', // Important: Mark as buyer
      })

      if (error) {
        setErrors({ general: 'خطا در ثبت‌نام. لطفا دوباره تلاش کنید' })
      } else {
        // Redirect to email verification page
        navigate('/auth/verify-email')
      }
    } catch (err) {
      setErrors({ general: 'خطایی رخ داده است. لطفا دوباره تلاش کنید' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">ثبت‌نام خریدار</h1>
            <p className="text-gray-600 text-sm">حساب خریدار خود را ایجاد کنید</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="input-group">
              <label className="input-label">نام و نام خانوادگی</label>
              <div className="relative">
                <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pr-11 ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="نام و نام خانوادگی"
                  required
                />
              </div>
              {errors.fullName && (
                <span className="text-xs text-red-600">{errors.fullName}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pr-11 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-600">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">شماره تماس</label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pr-11 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="09123456789"
                  required
                  dir="ltr"
                />
              </div>
              {errors.phone && (
                <span className="text-xs text-red-600">{errors.phone}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pr-11 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && (
                <span className="text-xs text-red-600">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">تکرار رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pr-11 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-red-600">{errors.confirmPassword}</span>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 mt-1 rounded border-gray-300 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                />
                <span className="text-sm text-gray-600">
                  <Link to="/terms" className="text-primary-600 hover:underline">
                    قوانین و مقررات
                  </Link>
                  {' '}و{' '}
                  <Link to="/privacy" className="text-primary-600 hover:underline">
                    حریم خصوصی
                  </Link>
                  {' '}را می‌پذیرم
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className="text-xs text-red-600 mt-1 block">{errors.agreeToTerms}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام خریدار'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm space-y-2">
            <div>
              <span className="text-gray-600">می‌خواهید فروشنده شوید؟ </span>
              <Link to="/auth/register/vendor" className="text-primary-600 hover:text-primary-700 font-medium">
                ثبت‌نام فروشنده
              </Link>
            </div>
            <div>
              <span className="text-gray-600">قبلا ثبت‌نام کرده‌اید؟ </span>
              <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

