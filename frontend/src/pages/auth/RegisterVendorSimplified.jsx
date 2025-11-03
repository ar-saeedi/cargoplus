import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Building, Phone, Eye, EyeOff, Shield } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'
import Logo from '../../components/Logo'

export default function RegisterVendorSimplified() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const recaptchaRef = useRef(null)
  
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

  // reCAPTCHA site key (you can get this from Google reCAPTCHA)
  // For now using test key - replace with your real key
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Test key

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true)
      setErrors(prev => ({ ...prev, captcha: '' }))
    }
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

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/vendor/international`,
          scopes: 'email profile',
        }
      })
      
      if (error) {
        alert(`Error with ${provider} login: ${error.message}`)
      }
    } catch (err) {
      alert(`Failed to login with ${provider}`)
    }
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
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Vendor Account</h1>
            <p className="text-gray-600 text-sm">Join thousands of sellers on CargoPlus</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="hidden sm:inline">Facebook</span>
              </button>

              <button
                onClick={() => handleSocialLogin('linkedin')}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
              >
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
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

            {/* reCAPTCHA */}
            <div className="flex flex-col items-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
                theme="light"
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

