import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Logo from '../../components/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError('خطا در ارسال ایمیل. لطفا بررسی کنید که ایمیل صحیح باشد')
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('خطایی رخ داده است. لطفا دوباره تلاش کنید')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link to="/" className="flex justify-center mb-8">
            <Logo size="md" showText={true} />
          </Link>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={32} />
            </div>

            <h1 className="text-2xl font-bold mb-3">ایمیل ارسال شد!</h1>
            <p className="text-gray-600 mb-6">
              لینک بازیابی رمز عبور به ایمیل شما ارسال شد:
            </p>

            <div className="bg-gray-100 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium text-gray-900" dir="ltr">{email}</p>
            </div>

            <div className="text-right bg-blue-50 p-4 rounded-lg mb-6 space-y-2 text-sm">
              <p className="font-medium text-blue-900 mb-2">مراحل بازیابی:</p>
              <p className="text-blue-700">۱. صندوق ورودی ایمیل خود را بررسی کنید</p>
              <p className="text-blue-700">۲. روی لینک بازیابی رمز عبور کلیک کنید</p>
              <p className="text-blue-700">۳. رمز عبور جدید را وارد کنید</p>
              <p className="text-blue-700">۴. با رمز جدید وارد شوید</p>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              ⚠️ ایمیل را نمی‌بینید؟ پوشه Spam را بررسی کنید
            </p>

            <Link to="/auth/login" className="btn btn-primary w-full">
              بازگشت به صفحه ورود
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="md" showText={true} />
        </Link>

        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Mail className="text-primary-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">فراموشی رمز عبور</h1>
            <p className="text-gray-600 text-sm">
              ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="input-group">
              <label className="input-label">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-11"
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/auth/login" className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2">
              <ArrowRight size={16} className="rotate-180" />
              بازگشت به صفحه ورود
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>حساب کاربری ندارید؟</p>
          <Link to="/auth/register" className="text-primary-600 hover:underline">
            ثبت‌نام کنید
          </Link>
        </div>
      </div>
    </div>
  )
}

