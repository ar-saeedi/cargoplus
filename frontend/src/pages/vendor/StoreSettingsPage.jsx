import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Store, Upload, X, Save, Eye } from 'lucide-react'

export default function StoreSettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  
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
      setLogoPreview(URL.createObjectURL(file))
      // TODO: Upload to Supabase storage when save
    }
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
      // TODO: Upload to Supabase storage when save
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Save to Supabase vendors table
      console.log('Store Data:', storeData)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('تنظیمات فروشگاه با موفقیت ذخیره شد!')
    } catch (error) {
      alert('خطا در ذخیره تنظیمات')
    } finally {
      setLoading(false)
    }
  }

  const handlePreviewStore = () => {
    // Open store preview in new tab
    window.open('/store/preview', '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">تنظیمات فروشگاه</h1>
            <p className="text-gray-600">صفحه اختصاصی فروشگاه خود را سفارشی‌سازی کنید</p>
          </div>
          <button
            type="button"
            onClick={handlePreviewStore}
            className="btn btn-outline flex items-center gap-2"
          >
            <Eye size={20} />
            پیش‌نمایش فروشگاه
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Store Branding */}
          <div className="pb-6 border-b">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Store size={20} className="text-primary-600" />
              برندینگ فروشگاه
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
              disabled={loading}
              className="btn btn-primary flex items-center gap-2"
            >
              <Save size={20} />
              {loading ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
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

          {/* Help Text */}
          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            💡 <strong>نکته:</strong> با تکمیل این اطلاعات، صفحه اختصاصی فروشگاه شما حرفه‌ای‌تر به نظر می‌رسد و اعتماد مشتریان افزایش می‌یابد.
          </div>
        </form>
      </div>
    </div>
  )
}

