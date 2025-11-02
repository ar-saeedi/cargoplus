import { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Mail, Lock, User as UserIcon, Phone, Store, Building, MapPin, Globe as GlobeIcon } from 'lucide-react'
import Logo from '../../components/Logo'

export default function RegisterVendorInternationalPage() {
  const { lang = 'en' } = useParams()
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Translations
  const translations = {
    en: {
      title: 'International Vendor Registration',
      subtitle: 'Create your seller account',
      personalInfo: 'Personal Information',
      businessInfo: 'Business Information',
      contactInfo: 'Contact Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number (with country code)',
      phonePlaceholder: '+1 234 567 8900',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      companyName: 'Company / Store Name',
      businessType: 'Business Type',
      selectType: 'Select business type',
      manufacturer: 'Manufacturer / Factory',
      wholesaler: 'Wholesaler',
      retailer: 'Retailer',
      distributor: 'Distributor',
      importer: 'Importer / Exporter',
      country: 'Country',
      city: 'City',
      address: 'Complete Address',
      postalCode: 'Postal / ZIP Code',
      agreeToTerms: 'I agree to the Terms and Conditions for international vendors',
      registerButton: 'Register and Create Store',
      registeringButton: 'Registering...',
      backToLanguage: 'Change Language',
      alreadyHaveAccount: 'Already have an account?',
      loginHere: 'Login here',
    },
    zh: {
      title: '国际卖家注册',
      subtitle: '创建您的卖家账户',
      personalInfo: '个人信息',
      businessInfo: '企业信息',
      contactInfo: '联系信息',
      fullName: '全名',
      email: '电子邮件地址',
      phone: '电话号码（带国家代码）',
      phonePlaceholder: '+86 138 0000 0000',
      password: '密码',
      confirmPassword: '确认密码',
      companyName: '公司/店铺名称',
      businessType: '业务类型',
      selectType: '选择业务类型',
      manufacturer: '制造商 / 工厂',
      wholesaler: '批发商',
      retailer: '零售商',
      distributor: '分销商',
      importer: '进出口商',
      country: '国家',
      city: '城市',
      address: '完整地址',
      postalCode: '邮政编码',
      agreeToTerms: '我同意国际卖家的条款和条件',
      registerButton: '注册并创建店铺',
      registeringButton: '注册中...',
      backToLanguage: '更改语言',
      alreadyHaveAccount: '已有账户？',
      loginHere: '在此登录',
    }
  }

  const t = translations[lang] || translations.en
  const isRTL = lang === 'ar'

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

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms'

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
        userType: 'vendor',
        isInternational: true,
        language: lang,
        companyName: formData.companyName,
        businessType: formData.businessType,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
      })

      if (error) {
        setErrors({ general: 'Registration failed. Please try again.' })
      } else {
        navigate('/auth/verify-email')
      }
    } catch (err) {
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-3xl">
        <Link to="/" className="flex justify-center mb-6">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GlobeIcon className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
            
            {/* Language Switcher */}
            <div className="mt-4">
              <Link
                to="/auth/register/vendor/international"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <GlobeIcon size={16} />
                <span>{t.backToLanguage}</span>
              </Link>
            </div>
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
                <UserIcon size={20} className="text-blue-600" />
                {t.personalInfo}
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">{t.fullName}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'border-red-500' : ''}
                    placeholder={lang === 'en' ? 'John Smith' : lang === 'zh' ? '张三' : 'Name'}
                    required
                  />
                  {errors.fullName && <span className="text-xs text-red-600">{errors.fullName}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">{t.email}</label>
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
                    <label className="input-label">{t.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'border-red-500' : ''}
                      placeholder={t.phonePlaceholder}
                      required
                      dir="ltr"
                    />
                    {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">{t.password}</label>
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
                    <label className="input-label">{t.confirmPassword}</label>
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
                <Building size={20} className="text-blue-600" />
                {t.businessInfo}
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">{t.companyName}</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={errors.companyName ? 'border-red-500' : ''}
                    placeholder={lang === 'en' ? 'ABC Trading Company' : lang === 'zh' ? '阿里巴巴贸易公司' : 'Company Name'}
                    required
                  />
                  {errors.companyName && <span className="text-xs text-red-600">{errors.companyName}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">{t.businessType}</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={errors.businessType ? 'border-red-500' : ''}
                    required
                  >
                    <option value="">{t.selectType}</option>
                    <option value="manufacturer">{t.businessTypes?.manufacturer || 'Manufacturer / Factory'}</option>
                    <option value="wholesaler">{t.businessTypes?.wholesaler || 'Wholesaler'}</option>
                    <option value="retailer">{t.businessTypes?.retailer || 'Retailer'}</option>
                    <option value="distributor">{t.businessTypes?.distributor || 'Distributor'}</option>
                    <option value="importer">{t.businessTypes?.importer || 'Importer / Exporter'}</option>
                  </select>
                  {errors.businessType && <span className="text-xs text-red-600">{errors.businessType}</span>}
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                {t.contactInfo}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">{t.country}</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={errors.country ? 'border-red-500' : ''}
                      placeholder={lang === 'en' ? 'China' : lang === 'zh' ? '中国' : 'Country'}
                      required
                    />
                    {errors.country && <span className="text-xs text-red-600">{errors.country}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">{t.city}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'border-red-500' : ''}
                      placeholder={lang === 'en' ? 'Shanghai' : lang === 'zh' ? '上海' : 'City'}
                      required
                    />
                    {errors.city && <span className="text-xs text-red-600">{errors.city}</span>}
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">{t.address}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'border-red-500' : ''}
                    placeholder={lang === 'en' ? 'Street, Building, Floor' : lang === 'zh' ? '街道，楼号，楼层' : 'Address'}
                    required
                  />
                  {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">{t.postalCode}</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? '12345' : lang === 'zh' ? '200000' : 'Postal Code'}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
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
                  {t.agreeToTerms}
                </span>
              </label>
              {errors.agreeToTerms && <span className="text-xs text-red-600 mt-1 block">{errors.agreeToTerms}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? t.registeringButton : t.registerButton}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm space-y-2">
            <div>
              <span className="text-gray-600">{t.alreadyHaveAccount} </span>
              <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                {t.loginHere}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

