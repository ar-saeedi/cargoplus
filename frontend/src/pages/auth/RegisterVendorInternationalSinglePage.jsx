import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Mail, Lock, User as UserIcon, Phone, Store, Building, MapPin, Globe, Eye, EyeOff, ChevronDown } from 'lucide-react'
import Logo from '../../components/Logo'

export default function RegisterVendorInternationalSinglePage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [detectedCountry, setDetectedCountry] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
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

  // Detect user's country/language from IP
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.country_name) {
          setDetectedCountry({
            name: data.country_name,
            code: data.country_code,
            language: data.languages?.split(',')[0] || 'en'
          })
          
          // Auto-set country
          setFormData(prev => ({
            ...prev,
            country: data.country_name
          }))
          
          // Suggest language based on country
          if (data.country_code === 'CN') {
            setSelectedLanguage('zh')
          } else if (data.country_code === 'SA' || data.country_code === 'AE') {
            setSelectedLanguage('ar')
          } else if (data.country_code === 'TR') {
            setSelectedLanguage('tr')
          } else if (data.country_code === 'RU') {
            setSelectedLanguage('ru')
          }
        }
      } catch (error) {
        console.log('Could not detect location')
      }
    }
    
    detectLocation()
  }, [])

  // Languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ]

  // Countries with flags
  const countries = [
    { name: 'China', nameLocal: '中国', flag: '🇨🇳', code: 'CN', phone: '+86' },
    { name: 'United States', nameLocal: 'USA', flag: '🇺🇸', code: 'US', phone: '+1' },
    { name: 'United Kingdom', nameLocal: 'UK', flag: '🇬🇧', code: 'GB', phone: '+44' },
    { name: 'Germany', nameLocal: 'Deutschland', flag: '🇩🇪', code: 'DE', phone: '+49' },
    { name: 'France', nameLocal: 'France', flag: '🇫🇷', code: 'FR', phone: '+33' },
    { name: 'Italy', nameLocal: 'Italia', flag: '🇮🇹', code: 'IT', phone: '+39' },
    { name: 'Spain', nameLocal: 'España', flag: '🇪🇸', code: 'ES', phone: '+34' },
    { name: 'Turkey', nameLocal: 'Türkiye', flag: '🇹🇷', code: 'TR', phone: '+90' },
    { name: 'Russia', nameLocal: 'Россия', flag: '🇷🇺', code: 'RU', phone: '+7' },
    { name: 'Japan', nameLocal: '日本', flag: '🇯🇵', code: 'JP', phone: '+81' },
    { name: 'South Korea', nameLocal: '한국', flag: '🇰🇷', code: 'KR', phone: '+82' },
    { name: 'India', nameLocal: 'भारत', flag: '🇮🇳', code: 'IN', phone: '+91' },
    { name: 'Brazil', nameLocal: 'Brasil', flag: '🇧🇷', code: 'BR', phone: '+55' },
    { name: 'Canada', nameLocal: 'Canada', flag: '🇨🇦', code: 'CA', phone: '+1' },
    { name: 'Australia', nameLocal: 'Australia', flag: '🇦🇺', code: 'AU', phone: '+61' },
    { name: 'UAE', nameLocal: 'الإمارات', flag: '🇦🇪', code: 'AE', phone: '+971' },
    { name: 'Saudi Arabia', nameLocal: 'السعودية', flag: '🇸🇦', code: 'SA', phone: '+966' },
    { name: 'Pakistan', nameLocal: 'Pakistan', flag: '🇵🇰', code: 'PK', phone: '+92' },
    { name: 'Bangladesh', nameLocal: 'বাংলাদেশ', flag: '🇧🇩', code: 'BD', phone: '+880' },
  ]

  // Translations
  const translations = {
    en: {
      title: 'International Vendor Registration',
      subtitle: 'Join CargoPlus and reach 80M+ Iranian customers',
      selectLanguage: 'Select Language',
      recommended: 'Recommended',
      personalInfo: 'Personal Information',
      businessInfo: 'Business Information',
      contactInfo: 'Contact & Location',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      phonePlaceholder: 'with country code (e.g., +86 138...)',
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
      country: 'Country / Region',
      selectCountry: 'Select your country',
      city: 'City',
      address: 'Complete Address',
      postalCode: 'Postal / ZIP Code',
      agreeToTerms: 'I agree to the International Vendor Terms and Conditions',
      registerButton: 'Register and Create Store',
      registeringButton: 'Registering...',
      backToLocal: 'Back to Local Registration',
      alreadyHaveAccount: 'Already have an account?',
      loginHere: 'Login here',
    },
    zh: {
      title: '国际卖家注册',
      subtitle: '加入CargoPlus，接触8000万+伊朗客户',
      selectLanguage: '选择语言',
      recommended: '推荐',
      personalInfo: '个人信息',
      businessInfo: '企业信息',
      contactInfo: '联系方式和地址',
      fullName: '全名',
      email: '电子邮件地址',
      phone: '电话号码',
      phonePlaceholder: '带国家代码 (例如: +86 138...)',
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
      country: '国家/地区',
      selectCountry: '选择您的国家',
      city: '城市',
      address: '完整地址',
      postalCode: '邮政编码',
      agreeToTerms: '我同意国际卖家条款和条件',
      registerButton: '注册并创建店铺',
      registeringButton: '注册中...',
      backToLocal: '返回本地注册',
      alreadyHaveAccount: '已有账户？',
      loginHere: '在此登录',
    },
    ar: {
      title: 'تسجيل البائع الدولي',
      subtitle: 'انضم إلى CargoPlus واصل إلى أكثر من 80 مليون عميل إيراني',
      selectLanguage: 'اختر اللغة',
      recommended: 'موصى به',
      personalInfo: 'المعلومات الشخصية',
      businessInfo: 'معلومات العمل',
      contactInfo: 'معلومات الاتصال والموقع',
      fullName: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      phonePlaceholder: 'مع رمز الدولة (مثال: +966 50...)',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      companyName: 'اسم الشركة / المتجر',
      businessType: 'نوع العمل',
      selectType: 'اختر نوع العمل',
      manufacturer: 'مصنع / منتج',
      wholesaler: 'تاجر جملة',
      retailer: 'تاجر تجزئة',
      distributor: 'موزع',
      importer: 'مستورد / مصدر',
      country: 'الدولة / المنطقة',
      selectCountry: 'اختر بلدك',
      city: 'المدينة',
      address: 'العنوان الكامل',
      postalCode: 'الرمز البريدي',
      agreeToTerms: 'أوافق على شروط وأحكام البائع الدولي',
      registerButton: 'التسجيل وإنشاء متجر',
      registeringButton: 'جاري التسجيل...',
      backToLocal: 'العودة إلى التسجيل المحلي',
      alreadyHaveAccount: 'لديك حساب؟',
      loginHere: 'تسجيل الدخول',
    },
    tr: {
      title: 'Uluslararası Satıcı Kaydı',
      subtitle: 'CargoPlus\'a katılın ve 80M+ İranlı müşteriye ulaşın',
      selectLanguage: 'Dil Seçin',
      recommended: 'Önerilen',
      personalInfo: 'Kişisel Bilgiler',
      businessInfo: 'İşletme Bilgileri',
      contactInfo: 'İletişim ve Konum',
      fullName: 'Tam Ad',
      email: 'E-posta Adresi',
      phone: 'Telefon Numarası',
      phonePlaceholder: 'ülke koduyla (+90 5...)',
      password: 'Şifre',
      confirmPassword: 'Şifre Onayla',
      companyName: 'Şirket / Mağaza Adı',
      businessType: 'İşletme Türü',
      selectType: 'İşletme türünü seçin',
      manufacturer: 'Üretici / Fabrika',
      wholesaler: 'Toptancı',
      retailer: 'Perakendeci',
      distributor: 'Distribütör',
      importer: 'İthalatçı / İhracatçı',
      country: 'Ülke / Bölge',
      selectCountry: 'Ülkenizi seçin',
      city: 'Şehir',
      address: 'Tam Adres',
      postalCode: 'Posta Kodu',
      agreeToTerms: 'Uluslararası Satıcı Şartlarını kabul ediyorum',
      registerButton: 'Kaydol ve Mağaza Oluştur',
      registeringButton: 'Kaydediliyor...',
      backToLocal: 'Yerel Kayda Dön',
      alreadyHaveAccount: 'Hesabınız var mı?',
      loginHere: 'Giriş yapın',
    },
    ru: {
      title: 'Регистрация международного продавца',
      subtitle: 'Присоединяйтесь к CargoPlus и достигайте 80M+ иранских клиентов',
      selectLanguage: 'Выберите язык',
      recommended: 'Рекомендуется',
      personalInfo: 'Личная информация',
      businessInfo: 'Информация о бизнесе',
      contactInfo: 'Контакты и местоположение',
      fullName: 'Полное имя',
      email: 'Адрес электронной почты',
      phone: 'Номер телефона',
      phonePlaceholder: 'с кодом страны (+7 9...)',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      companyName: 'Название компании / магазина',
      businessType: 'Тип бизнеса',
      selectType: 'Выберите тип бизнеса',
      manufacturer: 'Производитель / Фабрика',
      wholesaler: 'Оптовик',
      retailer: 'Розничный продавец',
      distributor: 'Дистрибьютор',
      importer: 'Импортёр / Экспортёр',
      country: 'Страна / Регион',
      selectCountry: 'Выберите вашу страну',
      city: 'Город',
      address: 'Полный адрес',
      postalCode: 'Почтовый индекс',
      agreeToTerms: 'Я согласен с условиями международного продавца',
      registerButton: 'Зарегистрироваться и создать магазин',
      registeringButton: 'Регистрация...',
      backToLocal: 'Назад к локальной регистрации',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      loginHere: 'Войти',
    }
  }

  const t = translations[selectedLanguage]
  const isRTL = selectedLanguage === 'ar'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCountryChange = (e) => {
    const countryName = e.target.value
    setFormData(prev => ({ ...prev, country: countryName }))
    
    // Auto-fill phone prefix
    const country = countries.find(c => c.name === countryName)
    if (country && !formData.phone) {
      setFormData(prev => ({ ...prev, phone: country.phone + ' ' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
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
    if (!formData.country) newErrors.country = 'Country is required'
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
      const { data, error } = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        userType: 'vendor',
        isInternational: true,
        language: selectedLanguage,
        companyName: formData.companyName,
        businessType: formData.businessType,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
      })

      if (error) {
        console.error('Registration error:', error)
        let errorMsg = 'Registration failed. Please try again.'
        
        if (error.message?.includes('already registered')) {
          errorMsg = 'This email is already registered. Please login instead.'
        } else if (error.message) {
          errorMsg = error.message
        }
        
        setErrors({ general: errorMsg })
      } else {
        console.log('Registration successful:', data)
        // Pass language to verification page
        navigate(`/auth/verify-email?lang=${selectedLanguage}`)
      }
    } catch (err) {
      console.error('Registration exception:', err)
      setErrors({ general: err.message || 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 py-12" dir="ltr">
      <div className="w-full max-w-3xl">
        <Link to="/" className="flex justify-center mb-6">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8">
          {/* Header with Language Selector */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b">
            <div className="text-left flex-1">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="text-white" size={32} />
              </div>
              <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
              <p className="text-gray-600 text-sm">{t.subtitle}</p>
            </div>

            {/* Language Dropdown */}
            <div className="relative min-w-[180px]">
              <label className="text-xs text-gray-500 mb-1 block text-left">{t.selectLanguage}</label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 pr-10 font-medium hover:border-primary-500 transition-colors cursor-pointer"
                  style={{ direction: 'ltr' }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                      {detectedCountry?.language?.includes(lang.code.split('-')[0]) && ` (${t.recommended})`}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Detected Location Info */}
          {detectedCountry && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-left">
                <Globe size={16} className="inline mr-2" />
                <strong>Detected Location:</strong> {detectedCountry.name} {countries.find(c => c.code === detectedCountry.code)?.flag}
                {' '}- Form auto-filled with your location
              </p>
            </div>
          )}

          {errors.general && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm text-left">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2 text-left">
                <UserIcon size={20} className="text-blue-600" />
                {t.personalInfo}
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label text-left">{t.fullName}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`text-left ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="John Smith / 张三"
                    required
                  />
                  {errors.fullName && <span className="text-xs text-red-600 text-left block">{errors.fullName}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label text-left">{t.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`text-left ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="vendor@company.com"
                      required
                      dir="ltr"
                    />
                    {errors.email && <span className="text-xs text-red-600 text-left block">{errors.email}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label text-left">{t.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`text-left ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder={t.phonePlaceholder}
                      required
                      dir="ltr"
                    />
                    {errors.phone && <span className="text-xs text-red-600 text-left block">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label text-left">{t.password}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-11 text-left ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex="-1"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <span className="text-xs text-red-600 text-left block">{errors.password}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label text-left">{t.confirmPassword}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-11 text-left ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex="-1"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="text-xs text-red-600 text-left block">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2 text-left">
                <Building size={20} className="text-blue-600" />
                {t.businessInfo}
              </h3>
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label text-left">{t.companyName}</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`text-left ${errors.companyName ? 'border-red-500' : ''}`}
                    placeholder="ABC Trading Company / 阿里巴巴"
                    required
                  />
                  {errors.companyName && <span className="text-xs text-red-600 text-left block">{errors.companyName}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label text-left">{t.businessType}</label>
                  <div className="relative">
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={`appearance-none text-left ${errors.businessType ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">{t.selectType}</option>
                      <option value="manufacturer">{t.manufacturer}</option>
                      <option value="wholesaler">{t.wholesaler}</option>
                      <option value="retailer">{t.retailer}</option>
                      <option value="distributor">{t.distributor}</option>
                      <option value="importer">{t.importer}</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                  {errors.businessType && <span className="text-xs text-red-600 text-left block">{errors.businessType}</span>}
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div>
              <h3 className="font-bold text-lg mb-4 pb-2 border-b flex items-center gap-2 text-left">
                <MapPin size={20} className="text-blue-600" />
                {t.contactInfo}
              </h3>
              <div className="space-y-4">
                {/* Country Selector with Flags */}
                <div className="input-group">
                  <label className="input-label text-left">{t.country}</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      className={`appearance-none text-left ${errors.country ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">{t.selectCountry}</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.flag} {country.name} ({country.nameLocal})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                  {errors.country && <span className="text-xs text-red-600 text-left block">{errors.country}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label text-left">{t.city}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`text-left ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Shanghai / London / Dubai"
                      required
                    />
                    {errors.city && <span className="text-xs text-red-600 text-left block">{errors.city}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label text-left">{t.postalCode}</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="text-left"
                      placeholder="12345 / 200000"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label text-left">{t.address}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`text-left ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Street, Building, Floor..."
                    required
                  />
                  {errors.address && <span className="text-xs text-red-600 text-left block">{errors.address}</span>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="text-left">
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
              className="btn btn-primary w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? t.registeringButton : t.registerButton}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm space-y-2 border-t pt-6">
            <div>
              <Link to="/auth/register/vendor" className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2">
                <span>{t.backToLocal}</span>
              </Link>
            </div>
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

