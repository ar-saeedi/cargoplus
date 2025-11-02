import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, RefreshCw } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'
import Logo from '../../components/Logo'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') || 'fa'
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // If user is already verified, redirect
    if (user?.email_confirmed_at) {
      const userType = user?.user_metadata?.user_type
      const isInternational = user?.user_metadata?.is_international
      const userLang = user?.user_metadata?.language
      
      if (userType === 'vendor') {
        if (isInternational || userLang !== 'fa') {
          navigate('/vendor/international')
        } else {
          navigate('/vendor')
        }
      } else {
        navigate('/dashboard')
      }
    }
  }, [user, navigate])

  const translations = {
    fa: {
      title: 'تایید ایمیل',
      subtitle: 'یک ایمیل تایید به آدرس زیر ارسال شد:',
      steps: 'مراحل تایید:',
      step1: '۱. صندوق ورودی ایمیل خود را بررسی کنید',
      step2: '۲. ایمیل از CargoPlus را پیدا کنید',
      step3: '۳. روی لینک تایید کلیک کنید',
      step4: '۴. به طور خودکار وارد می‌شوید',
      spamWarning: '⚠️ ایمیل را نمی‌بینید؟ پوشه Spam را بررسی کنید',
      resendButton: 'ارسال مجدد ایمیل',
      resending: 'در حال ارسال...',
      backToHome: 'بازگشت به صفحه اصلی',
    },
    en: {
      title: 'Verify Your Email',
      subtitle: 'A verification email has been sent to:',
      steps: 'Verification Steps:',
      step1: '1. Check your email inbox',
      step2: '2. Find the email from CargoPlus',
      step3: '3. Click the verification link',
      step4: '4. You will be automatically logged in',
      spamWarning: '⚠️ Can\'t find the email? Check your Spam folder',
      resendButton: 'Resend Email',
      resending: 'Sending...',
      backToHome: 'Back to Home',
    },
    zh: {
      title: '验证您的电子邮件',
      subtitle: '验证邮件已发送至:',
      steps: '验证步骤:',
      step1: '1. 检查您的邮箱收件箱',
      step2: '2. 找到来自CargoPlus的邮件',
      step3: '3. 点击验证链接',
      step4: '4. 您将自动登录',
      spamWarning: '⚠️ 找不到邮件？检查垃圾邮件文件夹',
      resendButton: '重新发送邮件',
      resending: '发送中...',
      backToHome: '返回首页',
    }
  }

  const txt = translations[lang] || translations.en
  const isRTL = lang === 'fa' || lang === 'ar'

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="md" showText={true} />
        </Link>

        <div className={`card p-8 ${isRTL ? 'text-center' : 'text-center'}`}>
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Mail className="text-white" size={40} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-3">{txt.title}</h1>
          <p className="text-gray-600 mb-6">
            {txt.subtitle}
          </p>

          {/* Email Display */}
          <div className="bg-gray-100 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium text-gray-900" dir="ltr">
              {user?.email || 'your-email@example.com'}
            </p>
          </div>

          {/* Instructions */}
          <div className={`${isRTL ? 'text-right' : 'text-left'} bg-blue-50 p-4 rounded-lg mb-6 space-y-2 text-sm`}>
            <p className="font-medium text-blue-900 mb-2">{txt.steps}</p>
            <p className="text-blue-700">{txt.step1}</p>
            <p className="text-blue-700">{txt.step2}</p>
            <p className="text-blue-700">{txt.step3}</p>
            <p className="text-blue-700">{txt.step4}</p>
          </div>

          {/* Spam Warning */}
          <p className="text-sm text-gray-500 mb-6">
            {txt.spamWarning}
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
                {txt.resending}
              </>
            ) : (
              <>
                <RefreshCw size={20} />
                {txt.resendButton}
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
              {txt.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

