import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { Upload, X, Plus, Eye } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { createProduct, uploadImage } from '../../services/vendorService'
import { supabase } from '../../lib/supabase'

export default function AddProductEnhanced() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const context = useOutletContext()
  const isInternational = location.pathname.includes('/international')
  const language = context?.language || 'en'
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    // FOB Pricing
    fobPriceUSD: '',
    fobPriceRMB: '',
    fobCompareUSD: '',
    fobCompareRMB: '',
    fobPort: 'Shanghai',
    // CFR Iran Pricing
    cfrPriceUSD: '',
    cfrPriceRMB: '',
    cfrCompareUSD: '',
    cfrCompareRMB: '',
    cfrPort: 'Bandar Abbas',
    // MOQ
    moq: '',
    pcsPerCarton: '',
    stock: '',
    description: '',
    specifications: '',
  })
  
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [detectedCategory, setDetectedCategory] = useState('')
  const [loading, setLoading] = useState(false)

  // Category-specific subcategories
  const subcategories = {
    cosmetics: ['Lipstick', 'Serum', 'Cream', 'Mask', 'Foundation', 'Eyeshadow', 'Perfume', 'Skincare'],
    'car-accessories': ['Car Audio', 'Interior Accessories', 'Exterior Parts', 'Tools', 'Car Care', 'Electronics', 'Covers', 'Mats']
  }

  // FOB Ports
  const fobPorts = ['Shanghai', 'Ningbo', 'Guangzhou', 'Shenzhen', 'Qingdao', 'Tianjin']
  const cfrPorts = ['Bandar Abbas', 'Bushehr', 'Chabahar']

  // Load categories from Supabase
  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
      
      if (data) {
        setCategories(data)
      }
    }
    loadCategories()
  }, [])

  // Auto-detect category from title
  const autoDetectCategory = (title) => {
    const t = title.toLowerCase()
    
    // Cosmetics keywords
    if (/lip|serum|cream|mask|foundation|eyeshadow|perfume|skincare|beauty|cosmetic/i.test(t)) {
      setFormData(prev => ({ ...prev, category: 'cosmetics' }))
      setDetectedCategory('Cosmetics')
      if (/lip/i.test(t)) setFormData(prev => ({ ...prev, subcategory: 'Lipstick' }))
      else if (/serum|cream/i.test(t)) setFormData(prev => ({ ...prev, subcategory: 'Serum' }))
      else if (/mask/i.test(t)) setFormData(prev => ({ ...prev, subcategory: 'Mask' }))
    }
    // Car accessories keywords
    else if (/car|auto|vehicle|dashboard|seat|wheel|tire|engine/i.test(t)) {
      setFormData(prev => ({ ...prev, category: 'car-accessories' }))
      setDetectedCategory('Car Accessories')
      if (/audio|speaker/i.test(t)) setFormData(prev => ({ ...prev, subcategory: 'Car Audio' }))
      else if (/seat|dashboard/i.test(t)) setFormData(prev => ({ ...prev, subcategory: 'Interior Accessories' }))
    } else {
      setDetectedCategory('—')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'title') {
      autoDetectCategory(value)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 10))
    setImageFiles(prev => [...prev, ...files].slice(0, 10))
  }

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
    const index = images.findIndex(img => img.id === imageId)
    if (index > -1) {
      setImageFiles(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload images
      const uploadedImageUrls = []
      for (const file of imageFiles) {
        const result = await uploadImage(file, 'products')
        if (result.success) {
          uploadedImageUrls.push(result.url)
        }
      }

      // Calculate Tehran price (CFR price is what buyers pay)
      const tehranPrice = formData.cfrPriceUSD || formData.fobPriceUSD

      // Create product
      const productData = {
        name: formData.title,
        description: formData.description || `${formData.title} - Premium quality product`,
        category: formData.category,
        price: parseFloat(tehranPrice) || 0,
        originalPrice: formData.cfrCompareUSD ? parseFloat(formData.cfrCompareUSD) : null,
        stock: parseInt(formData.stock) || 100,
        minOrder: parseInt(formData.moq) || 1,
        specifications: {
          subcategory: formData.subcategory,
          fob: {
            priceUSD: formData.fobPriceUSD,
            priceRMB: formData.fobPriceRMB,
            compareUSD: formData.fobCompareUSD,
            compareRMB: formData.fobCompareRMB,
            port: formData.fobPort,
          },
          cfr: {
            priceUSD: formData.cfrPriceUSD,
            priceRMB: formData.cfrPriceRMB,
            compareUSD: formData.cfrCompareUSD,
            compareRMB: formData.cfrCompareRMB,
            port: formData.cfrPort,
          },
          moq: formData.moq,
          pcsPerCarton: formData.pcsPerCarton,
          additionalNotes: formData.specifications,
        },
        images: uploadedImageUrls,
        status: 'published',
      }

      const result = await createProduct(productData, language)

      if (result.success) {
        alert(language === 'en' ? 'Product added successfully!' : 'محصول با موفقیت اضافه شد!')
        navigate(isInternational ? '/vendor/international/products' : '/vendor/products')
      } else {
        alert(language === 'en' ? 'Error adding product' : 'خطا در افزودن محصول')
      }
    } catch (error) {
      console.error('Error:', error)
      alert(language === 'en' ? 'Error adding product' : 'خطا در افزودن محصول')
    } finally {
      setLoading(false)
    }
  }

  const basePath = isInternational ? '/vendor/international' : '/vendor'

  return (
    <div className="space-y-6" dir="ltr">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-sm text-gray-600 mt-1">Fill details • Auto-live in Tehran</p>
          </div>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => navigate(`${basePath}/products`)}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
            >
              Discard
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save & Publish'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Product Title */}
            <div className="card">
              <label className="label text-left">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input text-left"
                placeholder="Snail Mucin Glow Serum 30ml"
                required
              />
              <p className="text-xs text-indigo-600 mt-2 text-left">
                Detected Category: <span className="font-medium">{detectedCategory}</span>
              </p>
            </div>

            {/* Pricing & Ports */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-5 text-left">Pricing & Ports</h2>

              {/* FOB */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">FOB (Ex-Factory)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label text-left">Price</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="fobPriceUSD"
                        value={formData.fobPriceUSD}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="1.80"
                        className="input text-center"
                        title="USD"
                      />
                      <input
                        type="number"
                        name="fobPriceRMB"
                        value={formData.fobPriceRMB}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="12.8"
                        className="input text-center"
                        title="RMB"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">USD | RMB</p>
                  </div>
                  <div>
                    <label className="label text-left">Compare-at</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="fobCompareUSD"
                        value={formData.fobCompareUSD}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="3.50"
                        className="input text-center text-gray-500"
                      />
                      <input
                        type="number"
                        name="fobCompareRMB"
                        value={formData.fobCompareRMB}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="25.0"
                        className="input text-center text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label text-left">Port</label>
                    <select
                      name="fobPort"
                      value={formData.fobPort}
                      onChange={handleChange}
                      className="select text-left"
                    >
                      {fobPorts.map(port => (
                        <option key={port} value={port}>{port}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* CFR Iran */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">CFR Iran (Delivered to Iran Port)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label text-left">Price</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="cfrPriceUSD"
                        value={formData.cfrPriceUSD}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="2.32"
                        className="input text-center"
                        title="USD"
                        required
                      />
                      <input
                        type="number"
                        name="cfrPriceRMB"
                        value={formData.cfrPriceRMB}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="16.5"
                        className="input text-center"
                        title="RMB"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label text-left">Compare-at</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="cfrCompareUSD"
                        value={formData.cfrCompareUSD}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="4.50"
                        className="input text-center text-gray-500"
                      />
                      <input
                        type="number"
                        name="cfrCompareRMB"
                        value={formData.cfrCompareRMB}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="32.0"
                        className="input text-center text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label text-left">Iran Port</label>
                    <select
                      name="cfrPort"
                      value={formData.cfrPort}
                      onChange={handleChange}
                      className="select text-left"
                    >
                      {cfrPorts.map(port => (
                        <option key={port} value={port}>{port}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tehran Preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm">
                <p className="font-medium text-gray-700">Tehran buyer will see:</p>
                <div className="mt-2 space-y-1">
                  <p>
                    <span className="font-bold text-indigo-700">{formData.fobPriceUSD || '—'} USD</span>
                    {formData.fobCompareUSD && <span className="line-through text-gray-500 ml-2">~~{formData.fobCompareUSD}~~</span>}
                    {' | '}
                    <span className="font-bold text-indigo-700">{formData.fobPriceRMB || '—'} RMB</span> FOB
                  </p>
                  <p>
                    <span className="font-bold text-pink-700">{formData.cfrPriceUSD || '—'} USD</span>
                    {formData.cfrCompareUSD && <span className="line-through text-gray-500 ml-2">~~{formData.cfrCompareUSD}~~</span>}
                    {' | '}
                    CFR {formData.cfrPort}
                  </p>
                </div>
              </div>
            </div>

            {/* MOQ & Stock */}
            <div className="card">
              <label className="label text-left">MOQ & Packaging</label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="moq"
                  value={formData.moq}
                  onChange={handleChange}
                  placeholder="MOQ (pcs)"
                  className="input text-center"
                  required
                />
                <input
                  type="number"
                  name="pcsPerCarton"
                  value={formData.pcsPerCarton}
                  onChange={handleChange}
                  placeholder="Pcs / carton"
                  className="input text-center"
                />
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="input text-center"
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="card">
              <label className="label text-left">Product Images (up to 10)</label>
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
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 10 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-600 transition-colors">
                      <div className="text-center">
                        <Plus size={24} className="mx-auto text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Add</span>
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

              {images.length === 0 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 transition-colors cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload images</p>
                  <p className="text-sm text-gray-500">Maximum 10 images, each max 5MB</p>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="card">
              <label className="label text-left">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Detailed product description..."
                className="input text-left"
              />
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="card">
              <label className="label text-left">Main Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select text-left mb-4"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              {formData.category && (
                <>
                  <label className="label text-left mt-4">Subcategory</label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="select text-left"
                  >
                    <option value="">Select subcategory</option>
                    {subcategories[formData.category]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {/* Live Preview */}
            <div className="card sticky top-20">
              <label className="label text-left">Live Preview</label>
              <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-lg p-4 mt-2">
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded w-full h-32 mb-3 flex items-center justify-center">
                    {images[0] ? (
                      <img src={images[0].url} alt="Preview" className="w-full h-full object-cover rounded" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{formData.title || 'Product Title'}</p>
                  <p className="text-lg font-bold text-pink-600 mt-1">
                    CFR {formData.cfrPriceUSD || '—'} USD
                  </p>
                  {formData.cfrCompareUSD && (
                    <p className="text-xs text-gray-500 line-through">~~{formData.cfrCompareUSD}~~</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{formData.cfrPort || 'Bandar Abbas'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; }
        .input { border: 1px solid #d1d5db; border-radius: 8px; padding: 0.65rem 1rem; font-size: 0.95rem; transition: all .2s; width: 100%; }
        .input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.15); }
        .select { border: 1px solid #d1d5db; border-radius: 8px; padding: 0.65rem 1rem; font-size: 0.95rem; background: white; width: 100%; }
        .label { font-weight: 600; font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem; display: block; }
      `}</style>
    </div>
  )
}

