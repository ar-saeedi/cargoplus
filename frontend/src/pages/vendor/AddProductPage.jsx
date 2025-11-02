import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Upload, X, Plus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { createProduct, uploadImage } from '../../services/vendorService'

export default function AddProductPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const context = useOutletContext()
  const isInternational = location.pathname.includes('/international')
  const language = context?.language || 'fa'
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    minOrder: '1',
    description: '',
    specifications: '',
  })
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [loading, setLoading] = useState(false)
  
  const translations = {
    en: {
      title: 'Add Product',
      productName: 'Product Name',
      category: 'Category',
      selectCategory: 'Select category',
      price: 'Product Price ($)',
      originalPrice: 'Original Price (Optional)',
      pricePlaceholder: 'Price before discount',
      priceNote: 'Enter original price to show discount',
      stock: 'Stock',
      minOrder: 'Minimum Order',
      description: 'Product Description',
      descPlaceholder: 'Complete description about product, features and benefits',
      specifications: 'Specifications (Optional)',
      specsPlaceholder: 'Example: Color: White, Size: Large, Material: Cotton',
      specsNote: 'Write each specification on a new line',
      productImages: 'Product Images',
      uploadImages: 'Click to upload images or drag files',
      imagesNote: 'Maximum 5 images, each max 2MB',
      publish: 'Publish Product',
      draft: 'Save as Draft',
      cancel: 'Cancel',
      saving: 'Saving...',
      note: 'Note: After connecting to Supabase, your products will be immediately displayed on the site',
    },
    zh: {
      title: '添加产品',
      productName: '产品名称',
      category: '类别',
      selectCategory: '选择类别',
      price: '产品价格 ($)',
      originalPrice: '原价（可选）',
      pricePlaceholder: '折扣前价格',
      priceNote: '输入原价以显示折扣',
      stock: '库存',
      minOrder: '最低订单',
      description: '产品描述',
      descPlaceholder: '产品的完整描述、功能和优势',
      specifications: '规格（可选）',
      specsPlaceholder: '例如：颜色：白色，尺寸：大号，材质：棉',
      specsNote: '每行写一个规格',
      productImages: '产品图片',
      uploadImages: '点击上传图片或拖动文件',
      imagesNote: '最多5张图片，每张最大2MB',
      publish: '发布产品',
      draft: '保存为草稿',
      cancel: '取消',
      saving: '保存中...',
      note: '注意：连接Supabase后，您的产品将立即在网站上显示',
    },
    fa: {
      title: 'افزودن محصول',
      productName: 'نام محصول',
      category: 'دسته‌بندی',
      selectCategory: 'انتخاب کنید',
      price: 'قیمت محصول (تومان)',
      originalPrice: 'قیمت اصلی (اختیاری)',
      pricePlaceholder: 'قیمت قبل از تخفیف',
      priceNote: 'برای نمایش تخفیف، قیمت اصلی را وارد کنید',
      stock: 'موجودی',
      minOrder: 'حداقل سفارش',
      description: 'توضیحات محصول',
      descPlaceholder: 'توضیحات کامل درباره محصول، ویژگی‌ها و مزایا',
      specifications: 'مشخصات فنی (اختیاری)',
      specsPlaceholder: 'مثال: رنگ: سفید، سایز: Large، جنس: پنبه',
      specsNote: 'هر مشخصه را در یک خط جدید بنویسید',
      productImages: 'تصاویر محصول',
      uploadImages: 'برای آپلود تصاویر کلیک کنید یا فایل را بکشید',
      imagesNote: 'حداکثر 5 تصویر، هر کدام حداکثر 2MB',
      publish: 'انتشار محصول',
      draft: 'ذخیره پیش‌نویس',
      cancel: 'انصراف',
      saving: 'در حال ذخیره...',
      note: 'نکته: پس از اتصال به Supabase، محصولات شما بلافاصله در سایت نمایش داده می‌شوند',
    }
  }

  const txt = translations[language] || translations.fa
  const textDir = isInternational ? 'ltr' : 'rtl'
  const textAlign = isInternational ? 'text-left' : 'text-right'
  const basePath = isInternational ? '/vendor/international' : '/vendor'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 5))
    setImageFiles(prev => [...prev, ...files].slice(0, 5))
  }

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload images first
      const uploadedImageUrls = []
      for (const file of imageFiles) {
        const result = await uploadImage(file, 'products')
        if (result.success) {
          uploadedImageUrls.push(result.url)
        }
      }

      // Create product with uploaded image URLs
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        minOrder: parseInt(formData.minOrder) || 1,
        specifications: formData.specifications,
        images: uploadedImageUrls,
        status: 'published',
      }

      const result = await createProduct(productData, language)

      if (result.success) {
        alert(language === 'fa' ? 'محصول با موفقیت اضافه شد!' : 'Product added successfully!')
        navigate(`${basePath}/products`)
      } else {
        alert(language === 'fa' ? 'خطا در افزودن محصول' : 'Error adding product')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert(language === 'fa' ? 'خطا در افزودن محصول' : 'Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6" dir={textDir}>
      <div className={`card p-6 ${textAlign}`}>
        <h1 className="text-2xl font-bold mb-6">{txt.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-group md:col-span-2">
              <label className={`input-label ${textAlign}`}>{txt.productName}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">{t('vendor.productCategory')}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">انتخاب کنید</option>
                <option value="women">پوشاک زنانه</option>
                <option value="men">پوشاک مردانه</option>
                <option value="electronics">لوازم الکترونیکی</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">{t('vendor.productPrice')} (تومان)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">{t('vendor.productStock')}</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">حداقل سفارش</label>
              <input
                type="number"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                required
              />
            </div>

            <div className="input-group md:col-span-2">
              <label className="input-label">توضیحات محصول</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">قیمت اصلی (اختیاری)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="قیمت قبل از تخفیف"
              />
              <span className="text-xs text-gray-500">برای نمایش تخفیف، قیمت اصلی را وارد کنید</span>
            </div>

            <div className="input-group md:col-span-2">
              <label className="input-label">توضیحات محصول</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات کامل درباره محصول، ویژگی‌ها و مزایا"
                required
              />
            </div>

            <div className="input-group md:col-span-2">
              <label className="input-label">مشخصات فنی (اختیاری)</label>
              <textarea
                rows="3"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                placeholder="مثال: رنگ: سفید، سایز: Large، جنس: پنبه"
              />
              <span className="text-xs text-gray-500">هر مشخصه را در یک خط جدید بنویسید</span>
            </div>

            {/* Image Upload */}
            <div className="input-group md:col-span-2">
              <label className="input-label">{t('vendor.productImages')}</label>
              
              {/* Uploaded Images Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img 
                        src={image.url} 
                        alt={image.name}
                        className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-600 transition-colors">
                      <div className="text-center">
                        <Plus size={24} className="mx-auto text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">افزودن</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              )}

              {/* Upload Area */}
              {images.length === 0 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition-colors cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">برای آپلود تصاویر کلیک کنید یا فایل را بکشید</p>
                  <p className="text-sm text-gray-500">حداکثر 5 تصویر، هر کدام حداکثر 2MB</p>
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 border-t pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'در حال ذخیره...' : t('vendor.publishProduct')}
            </button>
            <button 
              type="button" 
              disabled={loading}
              className="btn btn-secondary"
            >
              {t('vendor.draftProduct')}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/vendor/products')}
              className="btn btn-outline"
            >
              {t('common.cancel')}
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            💡 <strong>نکته:</strong> پس از اتصال به Supabase، محصولات شما بلافاصله در سایت نمایش داده می‌شوند
          </div>
        </form>
      </div>
    </div>
  )
}

