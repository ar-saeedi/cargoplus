import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/authStore'
import { Mail, Lock, User as UserIcon, Phone, Store, Building, MapPin, Globe } from 'lucide-react'
import Logo from '../../components/Logo'

export default function RegisterVendorPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Business Info
    companyName: '',
    businessType: '',
    address: '',
    city: '',
    
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

    // Personal validations
    if (!formData.fullName.trim()) newErrors.fullName = 'نام و نام خانوادگی الزامی است'
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

    // Business validations
    if (!formData.companyName.trim()) newErrors.companyName = 'نام شرکت الزامی است'
    if (!formData.businessType) newErrors.businessType = 'نوع کسب‌وکار الزامی است'
    if (!formData.city.trim()) newErrors.city = 'شهر الزامی است'
    if (!formData.address.trim()) newErrors.address = 'آدرس الزامی است'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'باید قوانین و مقررات را بپذیرید'

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
        userType: 'vendor', // Important: Mark as vendor
        companyName: formData.companyName,
        businessType: formData.businessType,
        address: formData.address,
        city: formData.city,
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-orange-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <Link to="/" className="flex justify-center mb-6">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">ثبت‌نام فروشنده ایرانی</h1>
            <p className="text-gray-600 text-sm">فروشگاه آنلاین خود را راه‌اندازی کنید</p>
            
            {/* International Vendor Link */}
            <Link
              to="/auth/register/vendor/international"
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Globe size={18} />
              <span>International Vendor? Register Here</span>
              <span className="text-xs">🇬🇧 🇨🇳</span>
            </Link>
          </div>

          {errors.general && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2">
                <UserIcon size={20} className="text-primary-600" />
                اطلاعات شخصی
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'border-red-500' : ''}
                    placeholder="علی احمدی"
                    required
                  />
                  {errors.fullName && <span className="text-xs text-red-600">{errors.fullName}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">ایمیل</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="vendor@company.com"
                      required
                      dir="ltr"
                    />
                    {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">شماره تماس</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'border-red-500' : ''}
                      placeholder="09123456789"
                      required
                      dir="ltr"
                    />
                    {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">رمز عبور</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'border-red-500' : ''}
                      placeholder="••••••••"
                      required
                    />
                    {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">تکرار رمز عبور</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                      placeholder="••••••••"
                      required
                    />
                    {errors.confirmPassword && <span className="text-xs text-red-600">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2">
                <Building size={20} className="text-primary-600" />
                اطلاعات کسب‌وکار
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">نام شرکت / فروشگاه</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={errors.companyName ? 'border-red-500' : ''}
                    placeholder="شرکت تجاری کالا"
                    required
                  />
                  {errors.companyName && <span className="text-xs text-red-600">{errors.companyName}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">نوع کسب‌وکار</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={errors.businessType ? 'border-red-500' : ''}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="manufacturer">تولیدکننده / کارخانه</option>
                    <option value="wholesaler">عمده‌فروش</option>
                    <option value="retailer">خرده‌فروش</option>
                    <option value="distributor">توزیع‌کننده</option>
                    <option value="importer">واردکننده</option>
                  </select>
                  {errors.businessType && <span className="text-xs text-red-600">{errors.businessType}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">شهر</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'border-red-500' : ''}
                      placeholder="تهران"
                      required
                    />
                    {errors.city && <span className="text-xs text-red-600">{errors.city}</span>}
                  </div>

                  <div className="input-group md:col-span-1">
                    <label className="input-label">آدرس کامل</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'border-red-500' : ''}
                      placeholder="آدرس شرکت یا فروشگاه"
                      required
                    />
                    {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}
                  </div>
                </div>
              </div>
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
                    قوانین و مقررات فروشندگان
                  </Link>
                  {' '}را مطالعه کردم و می‌پذیرم
                </span>
              </label>
              {errors.agreeToTerms && <span className="text-xs text-red-600 mt-1 block">{errors.agreeToTerms}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام و ایجاد فروشگاه'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm space-y-2">
            <div>
              <span className="text-gray-600">می‌خواهید خریدار باشید؟ </span>
              <Link to="/auth/register/buyer" className="text-primary-600 hover:text-primary-700 font-medium">
                ثبت‌نام خریدار
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

