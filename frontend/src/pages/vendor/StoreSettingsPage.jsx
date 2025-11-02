import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Store, Upload, X, Save, Eye, Globe } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { saveVendorProfile, getVendorProfile, uploadImage } from '../../services/vendorService'

export default function StoreSettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const location = useLocation()
  const context = useOutletContext()
  const isInternational = location.pathname.includes('/international')
  const dashboardLanguage = context?.language || 'fa'
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [vendorLanguage, setVendorLanguage] = useState('fa')
  
  const pageTranslations = {
    en: {
      title: 'Store Settings',
      subtitle: 'Customize your store page',
      preview: 'Preview Store',
      storeBranding: 'Store Branding',
      storeLogo: 'Store Logo',
      uploadLogo: 'Upload Logo',
      logoSize: 'Recommended: 400x400 pixels',
      coverImage: 'Store Cover Image',
      uploadCover: 'Upload Cover',
      coverSize: 'Recommended: 1200x400 pixels',
      basicInfo: 'Basic Information',
      companyName: 'Official Company Name',
      displayName: 'Display Name (Optional)',
      displayPlaceholder: 'Shorter name for display',
      slogan: 'Store Slogan',
      sloganPlaceholder: 'Best Quality, Best Price',
      aboutStore: 'About Store',
      aboutPlaceholder: 'Complete description about company, history, products and services...',
      contactInfo: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp (Optional)',
      telegram: 'Telegram (Optional)',
      website: 'Website (Optional)',
      instagram: 'Instagram (Optional)',
      locationAddress: 'Address & Location',
      country: 'Country',
      city: 'City',
      fullAddress: 'Full Address',
      postalCode: 'Postal Code',
      businessDetails: 'Business Details',
      businessType: 'Business Type',
      selectType: 'Select type',
      yearEstablished: 'Year Established',
      employees: 'Number of Employees',
      selectEmployees: 'Select range',
      seoSettings: 'SEO Optimization',
      metaDescription: 'Meta Description',
      metaPlaceholder: 'Short description for search results (max 160 characters)',
      keywords: 'Keywords',
      keywordsPlaceholder: 'clothing, wholesale, tehran',
      keywordsSeparate: 'Separate with comma',
      saveSettings: 'Save Settings',
      saving: 'Saving...',
      helpNote: 'Note: Complete this information makes your store look more professional and increases customer trust.',
    },
    zh: {
      title: '店铺设置',
      subtitle: '自定义您的店铺页面',
      preview: '预览店铺',
      storeBranding: '店铺品牌',
      storeLogo: '店铺标志',
      uploadLogo: '上传标志',
      logoSize: '建议: 400x400像素',
      coverImage: '店铺封面图',
      uploadCover: '上传封面',
      coverSize: '建议: 1200x400像素',
      basicInfo: '基本信息',
      companyName: '公司正式名称',
      displayName: '显示名称（可选）',
      displayPlaceholder: '用于显示的简短名称',
      slogan: '店铺口号',
      sloganPlaceholder: '优质第一，价格第二',
      aboutStore: '关于店铺',
      aboutPlaceholder: '公司、历史、产品和服务的完整描述...',
      contactInfo: '联系信息',
      email: '电子邮件',
      phone: '电话',
      whatsapp: 'WhatsApp（可选）',
      telegram: 'Telegram（可选）',
      website: '网站（可选）',
      instagram: 'Instagram（可选）',
      locationAddress: '地址和位置',
      country: '国家',
      city: '城市',
      fullAddress: '完整地址',
      postalCode: '邮政编码',
      businessDetails: '业务详情',
      businessType: '业务类型',
      selectType: '选择类型',
      yearEstablished: '成立年份',
      employees: '员工数量',
      selectEmployees: '选择范围',
      seoSettings: 'SEO优化',
      metaDescription: '元描述',
      metaPlaceholder: '搜索结果的简短描述（最多160个字符）',
      keywords: '关键词',
      keywordsPlaceholder: '服装，批发，上海',
      keywordsSeparate: '用逗号分隔',
      saveSettings: '保存设置',
      saving: '保存中...',
      helpNote: '注意：完成这些信息使您的店铺看起来更专业，增加客户信任。',
    },
    fa: {
      title: 'تنظیمات فروشگاه',
      subtitle: 'صفحه اختصاصی فروشگاه خود را سفارشی‌سازی کنید',
      preview: 'پیش‌نمایش فروشگاه',
      storeBranding: 'برندینگ فروشگاه',
      storeLogo: 'لوگوی فروشگاه',
      uploadLogo: 'آپلود لوگو',
      logoSize: 'توصیه می‌شود: 400x400 پیکسل',
      coverImage: 'تصویر کاور فروشگاه',
      uploadCover: 'آپلود تصویر کاور',
      coverSize: 'توصیه می‌شود: 1200x400 پیکسل',
      basicInfo: 'اطلاعات پایه',
      companyName: 'نام رسمی شرکت',
      displayName: 'نام نمایشی (اختیاری)',
      displayPlaceholder: 'نام کوتاه‌تر برای نمایش',
      slogan: 'شعار فروشگاه',
      sloganPlaceholder: 'بهترین کیفیت، بهترین قیمت',
      aboutStore: 'درباره فروشگاه',
      aboutPlaceholder: 'توضیحات کامل درباره شرکت، تاریخچه، محصولات و خدمات...',
      contactInfo: 'اطلاعات تماس',
      email: 'ایمیل',
      phone: 'تلفن',
      whatsapp: 'واتساپ (اختیاری)',
      telegram: 'تلگرام (اختیاری)',
      website: 'وب‌سایت (اختیاری)',
      instagram: 'اینستاگرام (اختیاری)',
      locationAddress: 'آدرس و موقعیت',
      country: 'کشور',
      city: 'شهر',
      fullAddress: 'آدرس کامل',
      postalCode: 'کد پستی',
      businessDetails: 'جزئیات کسب‌وکار',
      businessType: 'نوع کسب‌وکار',
      selectType: 'انتخاب کنید',
      yearEstablished: 'سال تأسیس',
      employees: 'تعداد کارکنان',
      selectEmployees: 'انتخاب کنید',
      seoSettings: 'بهینه‌سازی موتور جستجو (SEO)',
      metaDescription: 'توضیحات متا',
      metaPlaceholder: 'توضیح کوتاهی درباره فروشگاه برای نتایج جستجو (حداکثر ۱۶۰ کاراکتر)',
      keywords: 'کلمات کلیدی',
      keywordsPlaceholder: 'پوشاک، عمده‌فروشی، تهران',
      keywordsSeparate: 'با کاما جدا کنید',
      saveSettings: 'ذخیره تنظیمات',
      saving: 'در حال ذخیره...',
      helpNote: 'نکته: با تکمیل این اطلاعات، صفحه اختصاصی فروشگاه شما حرفه‌ای‌تر به نظر می‌رسد و اعتماد مشتریان افزایش می‌یابد.',
    }
  }

  const txt = pageTranslations[dashboardLanguage] || pageTranslations.fa
  const textDir = isInternational ? 'ltr' : 'rtl'
  const textAlign = isInternational ? 'text-left' : 'text-right'
  
  // Load existing vendor data
  useEffect(() => {
    const loadVendorData = async () => {
      setLoading(true)
      const result = await getVendorProfile(user?.id)
      if (result.success && result.data) {
        const vendor = result.data
        setVendorLanguage(vendor.language || 'fa')
        setStoreData({
          companyName: vendor.company_name || '',
          displayName: vendor.display_name || '',
          description: vendor.description_original || vendor.description || '',
          slogan: vendor.slogan || '',
          email: vendor.email || user?.email || '',
          phone: vendor.phone || '',
          whatsapp: vendor.whatsapp || '',
          telegram: vendor.telegram || '',
          website: vendor.website || '',
          instagram: vendor.instagram || '',
          country: vendor.country || '',
          city: vendor.city || '',
          address: vendor.address || '',
          postalCode: vendor.postal_code || '',
          businessType: vendor.business_type || '',
          yearEstablished: vendor.year_established || '',
          numberOfEmployees: vendor.number_of_employees || '',
          metaDescription: '',
          keywords: '',
        })
        setLogoPreview(vendor.logo_url)
        setCoverPreview(vendor.cover_image_url)
      }
      setLoading(false)
    }
    
    if (user) {
      loadVendorData()
    }
  }, [user])
  
  const [storeData, setStoreData] = useState({
    companyName: 'شرکت تست',
    displayName: '',
    description: '',
    slogan: '',
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    website: '',
    instagram: '',
    // Address
    country: '',
    city: '',
    address: '',
    postalCode: '',
    // Business
    businessType: '',
    yearEstablished: '',
    numberOfEmployees: '',
    // SEO
    metaDescription: '',
    keywords: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setStoreData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      let logoUrl = logoPreview
      let coverUrl = coverPreview

      // Upload logo if new file selected
      if (logoFile) {
        const result = await uploadImage(logoFile, 'vendors/logos')
        if (result.success) {
          logoUrl = result.url
        }
      }

      // Upload cover if new file selected
      if (coverFile) {
        const result = await uploadImage(coverFile, 'vendors/covers')
        if (result.success) {
          coverUrl = result.url
        }
      }

      // Save vendor profile with auto-translation
      const result = await saveVendorProfile({
        ...storeData,
        logoUrl,
        coverUrl,
      }, vendorLanguage)

      if (result.success) {
        alert('تنظیمات فروشگاه با موفقیت ذخیره شد!\n\nمحتوای شما به طور خودکار به فارسی ترجمه شد و برای خریداران ایرانی نمایش داده می‌شود.')
      } else {
        alert('خطا در ذخیره: ' + result.error)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('خطا در ذخیره تنظیمات')
    } finally {
      setSaving(false)
    }
  }

  const handlePreviewStore = async () => {
    // Get vendor ID first
    const result = await getVendorProfile(user?.id)
    if (result.success && result.data) {
      window.open(`/store/${result.data.id}`, '_blank')
    } else {
      alert('لطفا ابتدا تنظیمات را ذخیره کنید')
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6" dir={textDir}>
      <div className={`card p-6 ${textAlign}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{txt.title}</h1>
            <p className="text-gray-600">{txt.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handlePreviewStore}
            className="btn btn-outline flex items-center gap-2"
          >
            <Eye size={20} />
            {txt.preview}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Store Branding */}
          <div className="pb-6 border-b">
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAlign}`}>
              <Store size={20} className="text-primary-600" />
              {txt.storeBranding}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div>
                <label className="input-label">لوگوی فروشگاه</label>
                <div className="space-y-3">
                  {logoPreview ? (
                    <div className="relative w-32 h-32 group">
                      <img 
                        src={logoPreview} 
                        alt="Logo" 
                        className="w-full h-full object-cover rounded-xl border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoPreview(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-600 transition-colors">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">آپلود لوگو</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  <p className="text-xs text-gray-500">توصیه می‌شود: 400x400 پیکسل</p>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="input-label">تصویر کاور فروشگاه</label>
                <div className="space-y-3">
                  {coverPreview ? (
                    <div className="relative w-full h-32 group">
                      <img 
                        src={coverPreview} 
                        alt="Cover" 
                        className="w-full h-full object-cover rounded-xl border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverPreview(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-600 transition-colors">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">آپلود تصویر کاور</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  <p className="text-xs text-gray-500">توصیه می‌شود: 1200x400 پیکسل</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">اطلاعات پایه</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">نام رسمی شرکت</label>
                <input
                  type="text"
                  name="companyName"
                  value={storeData.companyName}
                  onChange={handleChange}
                  placeholder="شرکت تجاری مثال"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">نام نمایشی (اختیاری)</label>
                <input
                  type="text"
                  name="displayName"
                  value={storeData.displayName}
                  onChange={handleChange}
                  placeholder="فروشگاه آنلاین مثال"
                />
                <span className="text-xs text-gray-500">نام کوتاه‌تر برای نمایش</span>
              </div>

              <div className="input-group md:col-span-2">
                <label className="input-label">شعار فروشگاه</label>
                <input
                  type="text"
                  name="slogan"
                  value={storeData.slogan}
                  onChange={handleChange}
                  placeholder="بهترین کیفیت، بهترین قیمت"
                />
              </div>

              <div className="input-group md:col-span-2">
                <label className="input-label">درباره فروشگاه</label>
                <textarea
                  name="description"
                  value={storeData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="توضیحات کامل درباره شرکت، تاریخچه، محصولات و خدمات..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">اطلاعات تماس</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">ایمیل</label>
                <input
                  type="email"
                  name="email"
                  value={storeData.email}
                  onChange={handleChange}
                  placeholder="info@company.com"
                  dir="ltr"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={storeData.phone}
                  onChange={handleChange}
                  placeholder="021-12345678"
                  dir="ltr"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">واتساپ (اختیاری)</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={storeData.whatsapp}
                  onChange={handleChange}
                  placeholder="+98 912 345 6789"
                  dir="ltr"
                />
              </div>

              <div className="input-group">
                <label className="input-label">تلگرام (اختیاری)</label>
                <input
                  type="text"
                  name="telegram"
                  value={storeData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                  dir="ltr"
                />
              </div>

              <div className="input-group">
                <label className="input-label">وب‌سایت (اختیاری)</label>
                <input
                  type="url"
                  name="website"
                  value={storeData.website}
                  onChange={handleChange}
                  placeholder="https://company.com"
                  dir="ltr"
                />
              </div>

              <div className="input-group">
                <label className="input-label">اینستاگرام (اختیاری)</label>
                <input
                  type="text"
                  name="instagram"
                  value={storeData.instagram}
                  onChange={handleChange}
                  placeholder="@company_official"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">آدرس و موقعیت</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label">کشور</label>
                <input
                  type="text"
                  name="country"
                  value={storeData.country}
                  onChange={handleChange}
                  placeholder="ایران"
                />
              </div>

              <div className="input-group">
                <label className="input-label">شهر</label>
                <input
                  type="text"
                  name="city"
                  value={storeData.city}
                  onChange={handleChange}
                  placeholder="تهران"
                  required
                />
              </div>

              <div className="input-group md:col-span-2">
                <label className="input-label">آدرس کامل</label>
                <input
                  type="text"
                  name="address"
                  value={storeData.address}
                  onChange={handleChange}
                  placeholder="خیابان ولیعصر، پلاک ۱۲۳"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">کد پستی</label>
                <input
                  type="text"
                  name="postalCode"
                  value={storeData.postalCode}
                  onChange={handleChange}
                  placeholder="1234567890"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">جزئیات کسب‌وکار</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="input-group">
                <label className="input-label">نوع کسب‌وکار</label>
                <select
                  name="businessType"
                  value={storeData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  <option value="manufacturer">تولیدکننده / کارخانه</option>
                  <option value="wholesaler">عمده‌فروش</option>
                  <option value="retailer">خرده‌فروش</option>
                  <option value="distributor">توزیع‌کننده</option>
                  <option value="importer">واردکننده</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">سال تأسیس</label>
                <input
                  type="text"
                  name="yearEstablished"
                  value={storeData.yearEstablished}
                  onChange={handleChange}
                  placeholder="1400"
                />
              </div>

              <div className="input-group">
                <label className="input-label">تعداد کارکنان</label>
                <select
                  name="numberOfEmployees"
                  value={storeData.numberOfEmployees}
                  onChange={handleChange}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="1-10">۱-۱۰ نفر</option>
                  <option value="11-50">۱۱-۵۰ نفر</option>
                  <option value="51-200">۵۱-۲۰۰ نفر</option>
                  <option value="201-500">۲۰۱-۵۰۰ نفر</option>
                  <option value="500+">بیش از ۵۰۰ نفر</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">بهینه‌سازی موتور جستجو (SEO)</h3>
            <div className="space-y-4">
              <div className="input-group">
                <label className="input-label">توضیحات متا</label>
                <textarea
                  name="metaDescription"
                  value={storeData.metaDescription}
                  onChange={handleChange}
                  rows="2"
                  maxLength="160"
                  placeholder="توضیح کوتاهی درباره فروشگاه برای نتایج جستجو (حداکثر ۱۶۰ کاراکتر)"
                />
                <span className="text-xs text-gray-500">
                  {storeData.metaDescription.length}/160 کاراکتر
                </span>
              </div>

              <div className="input-group">
                <label className="input-label">کلمات کلیدی</label>
                <input
                  type="text"
                  name="keywords"
                  value={storeData.keywords}
                  onChange={handleChange}
                  placeholder="پوشاک، عمده‌فروشی، تهران"
                />
                <span className="text-xs text-gray-500">با کاما جدا کنید</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary flex items-center gap-2"
            >
              <Save size={20} />
              {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
            </button>
            <button
              type="button"
              onClick={handlePreviewStore}
              className="btn btn-outline flex items-center gap-2"
            >
              <Eye size={20} />
              پیش‌نمایش
            </button>
          </div>

          {/* Translation Info */}
          {vendorLanguage !== 'fa' && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm border border-blue-200">
              <div className="flex items-start gap-3">
                <Globe size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-blue-900 mb-2">🌍 Auto-Translation to Persian</p>
                  <p className="text-blue-700 mb-2">
                    You're writing in <strong>{vendorLanguage === 'en' ? 'English' : vendorLanguage === 'zh' ? 'Chinese' : 'your language'}</strong>.
                  </p>
                  <p className="text-blue-700">
                    ✨ <strong>Don't worry!</strong> Your content will be automatically translated to Persian (Farsi) for Iranian buyers.
                    Your original content is also saved and you can see it in your dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            💡 <strong>نکته:</strong> با تکمیل این اطلاعات، صفحه اختصاصی فروشگاه شما حرفه‌ای‌تر به نظر می‌رسد و اعتماد مشتریان افزایش می‌یابد.
          </div>
        </form>
      </div>
    </div>
  )
}

