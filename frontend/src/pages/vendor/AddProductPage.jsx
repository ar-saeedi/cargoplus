import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Upload } from 'lucide-react'

export default function AddProductPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minOrder: '1',
    description: '',
    specifications: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle product creation
    navigate('/vendor/products')
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-6">{t('vendor.addProduct')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-group md:col-span-2">
              <label className="input-label">{t('vendor.productName')}</label>
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

            <div className="input-group md:col-span-2">
              <label className="input-label">{t('vendor.productImages')}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition-colors cursor-pointer">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">برای آپلود تصاویر کلیک کنید</p>
                <p className="text-sm text-gray-500">حداکثر 5 تصویر، هر کدام حداکثر 2MB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary">
              {t('vendor.publishProduct')}
            </button>
            <button type="button" className="btn btn-secondary">
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
        </form>
      </div>
    </div>
  )
}

