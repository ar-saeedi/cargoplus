import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, RefreshCw } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'
import Logo from '../../components/Logo'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // If user is already verified, redirect
    if (user?.email_confirmed_at) {
      const userType = user?.user_metadata?.user_type
      if (userType === 'vendor') {
        navigate('/vendor')
      } else {
        navigate('/dashboard')
      }
    }
  }, [user, navigate])

  const handleResendEmail = async () => {
    setResending(true)
    setMessage('')

    try {
      // Resend verification email
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user?.email
      })

      if (error) {
        setMessage('خطا در ارسال مجدد ایمیل')
      } else {
        setMessage('ایمیل تایید مجدداً ارسال شد. لطفا صندوق ورودی خود را بررسی کنید')
      }
    } catch (error) {
      setMessage('خطا در ارسال ایمیل')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Mail className="text-white" size={40} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-3">تایید ایمیل</h1>
          <p className="text-gray-600 mb-6">
            یک ایمیل تایید به آدرس زیر ارسال شد:
          </p>

          {/* Email Display */}
          <div className="bg-gray-100 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium text-gray-900" dir="ltr">
              {user?.email || 'your-email@example.com'}
            </p>
          </div>

          {/* Instructions */}
          <div className="text-right bg-blue-50 p-4 rounded-lg mb-6 space-y-2 text-sm">
            <p className="font-medium text-blue-900 mb-2">مراحل تایید:</p>
            <p className="text-blue-700">۱. صندوق ورودی ایمیل خود را بررسی کنید</p>
            <p className="text-blue-700">۲. ایمیل از CargoPlus را پیدا کنید</p>
            <p className="text-blue-700">۳. روی لینک تایید کلیک کنید</p>
            <p className="text-blue-700">۴. به طور خودکار وارد می‌شوید</p>
          </div>

          {/* Spam Warning */}
          <p className="text-sm text-gray-500 mb-6">
            ⚠️ ایمیل را نمی‌بینید؟ پوشه Spam را بررسی کنید
          </p>

          {/* Resend Button */}
          <button
            onClick={handleResendEmail}
            disabled={resending}
            className="btn btn-outline w-full mb-4"
          >
            {resending ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <RefreshCw size={20} />
                ارسال مجدد ایمیل
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('خطا') 
                ? 'bg-red-50 text-red-700' 
                : 'bg-green-50 text-green-700'
            }`}>
              {message}
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t">
            <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>مشکلی دارید؟</p>
          <Link to="/contact" className="text-primary-600 hover:underline">
            با پشتیبانی تماس بگیرید
          </Link>
        </div>
      </div>
    </div>
  )
}

