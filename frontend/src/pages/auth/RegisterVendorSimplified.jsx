import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Building, Phone, Eye, EyeOff } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'
import Logo from '../../components/Logo'

export default function RegisterVendorSimplified() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    companyName: '',
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Cloudflare Turnstile Site Key (1x00000000000000000000AA = test key, always passes)
  // For production, get free key from Cloudflare Dashboard
  const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

  const onCaptchaVerify = (token) => {
    setCaptchaVerified(true)
    setErrors(prev => ({ ...prev, captcha: '' }))
  }

  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'Korea', flag: '🇰🇷' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi', flag: '🇸🇦' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
  ]

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

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
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
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!captchaVerified) newErrors.captcha = 'Please verify you are not a robot'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`
      const phoneWithCode = `${formData.countryCode} ${formData.phone}`
      
      const { data, error } = await register({
        email: formData.email,
        password: formData.password,
        fullName: fullName,
        phone: phoneWithCode,
        userType: 'vendor',
        isInternational: true,
        language: 'en',
        companyName: formData.companyName,
        businessType: 'seller',
        city: '',
        address: '',
        country: '',
      })

      if (error) {
        let errorMsg = 'Registration failed. Please try again.'
        if (error.message?.includes('already registered')) {
          errorMsg = 'This email is already registered. Please login instead.'
        }
        setErrors({ general: errorMsg })
      } else {
        navigate('/auth/verify-email?lang=en')
      }
    } catch (err) {
      setErrors({ general: err.message || 'An error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="ltr">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Vendor Account</h1>
            <p className="text-gray-600 text-sm">Join thousands of sellers on CargoPlus</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-left">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="input-group">
              <label className="input-label text-left">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 text-left ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@company.com"
                  required
                />
              </div>
              {errors.email && <span className="text-xs text-red-600 text-left block">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label text-left">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 text-left ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-600 text-left block">{errors.password}</span>}
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="input-group">
                <label className="input-label text-left">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`text-left ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="John"
                  required
                />
                {errors.firstName && <span className="text-xs text-red-600 text-left block">{errors.firstName}</span>}
              </div>

              <div className="input-group">
                <label className="input-label text-left">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`text-left ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Smith"
                  required
                />
                {errors.lastName && <span className="text-xs text-red-600 text-left block">{errors.lastName}</span>}
              </div>
            </div>

            {/* Company Name */}
            <div className="input-group">
              <label className="input-label text-left">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full pl-10 text-left ${errors.companyName ? 'border-red-500' : ''}`}
                  placeholder="Your Company Ltd."
                  required
                />
              </div>
              {errors.companyName && <span className="text-xs text-red-600 text-left block">{errors.companyName}</span>}
            </div>

            {/* Phone with Country Code */}
            <div className="input-group">
              <label className="input-label text-left">Telephone or mobile number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-24 text-left"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 text-left ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="123 456 7890"
                    required
                  />
                </div>
              </div>
              {errors.phone && <span className="text-xs text-red-600 text-left block">{errors.phone}</span>}
            </div>

            {/* Cloudflare Turnstile CAPTCHA */}
            <div className="flex flex-col items-center">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={onCaptchaVerify}
                options={{
                  theme: 'light',
                  size: 'normal',
                }}
              />
              {errors.captcha && (
                <span className="text-xs text-red-600 mt-2 text-center">{errors.captcha}</span>
              )}
            </div>

            {/* Terms */}
            <div className="text-left">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 mt-1 rounded ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                />
                <span className="text-xs text-gray-600">
                  I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Free Membership Agreement</Link>, 
                  <Link to="/terms" className="text-blue-600 hover:underline">Terms of Use</Link>, and 
                  <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> of CargoPlus.com. 
                  I agree to receive more information about the platform's products and services.
                </span>
              </label>
              {errors.agreeToTerms && <span className="text-xs text-red-600 mt-1 block">{errors.agreeToTerms}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 py-3 text-base font-semibold"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Secure registration • Verified vendors only • Free to join</p>
        </div>
      </div>
    </div>
  )
}

