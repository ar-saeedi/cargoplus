import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/authStore'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Logo from '../../components/Logo'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await login({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        console.error('Login error:', error)
        
        // Show specific error messages
        if (error.message?.includes('Invalid login credentials')) {
          setError('ایمیل یا رمز عبور اشتباه است')
        } else if (error.message?.includes('Email not confirmed')) {
          setError('لطفا ابتدا ایمیل خود را تایید کنید. ایمیل تایید را بررسی کنید')
        } else {
          setError(error.message || 'خطا در ورود. لطفا دوباره تلاش کنید')
        }
      } else if (!data?.session) {
        setError('خطا در ایجاد نشست. لطفا دوباره تلاش کنید')
      } else {
        // Login successful
        console.log('Login successful:', data)
        
        // Redirect based on user type
        const userType = data?.user?.user_metadata?.user_type || 'buyer'
        console.log('User type:', userType)
        
        if (userType === 'vendor') {
          navigate('/vendor')
        } else {
          navigate('/dashboard')
        }
      }
    } catch (err) {
      console.error('Login exception:', err)
      setError('خطایی رخ داده است. لطفا دوباره تلاش کنید')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="lg" showText={true} />
        </Link>

        {/* Login Form */}
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            به حساب کاربری خود وارد شوید
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="input-group">
              <label className="input-label">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pr-11"
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pr-11 pl-11"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">
                  {t('auth.rememberMe')}
                </span>
              </label>
              <Link 
                to="/auth/forgot-password" 
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? t('common.loading') : t('common.login')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{t('auth.noAccount')} </span>
            <Link to="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
              {t('auth.registerHere')}
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          با ورود به سایت، 
          <Link to="/terms" className="text-primary-600 hover:underline mx-1">
            قوانین و مقررات
          </Link>
          را می‌پذیرید
        </p>
      </div>
    </div>
  )
}

