import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, ArrowRight } from 'lucide-react'
import Logo from '../../components/Logo'

export default function InternationalVendorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      dir: 'ltr',
      path: '/auth/register/vendor/international/en'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      dir: 'ltr',
      path: '/auth/register/vendor/international/zh'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      dir: 'rtl',
      path: '/auth/register/vendor/international/ar'
    },
    {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      flag: '🇹🇷',
      dir: 'ltr',
      path: '/auth/register/vendor/international/tr'
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      dir: 'ltr',
      path: '/auth/register/vendor/international/ru'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4" dir="ltr">
      <div className="w-full max-w-4xl">
        <Link to="/" className="flex justify-center mb-8">
          <Logo size="lg" showText={true} />
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              International Vendor Registration
            </h1>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              国际卖家注册
            </h2>
            <p className="text-gray-600">
              Select your preferred language to continue registration
            </p>
            <p className="text-gray-600">
              选择您的首选语言以继续注册
            </p>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((language) => (
              <Link
                key={language.code}
                to={language.path}
                className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl p-6 text-center"
                onMouseEnter={() => setSelectedLanguage(language.code)}
                onMouseLeave={() => setSelectedLanguage(null)}
              >
                <div className="text-5xl mb-4">{language.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language.nativeName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{language.name}</p>
                <div className={`flex items-center justify-center gap-2 text-blue-600 font-medium transition-all ${
                  selectedLanguage === language.code ? 'translate-x-2' : ''
                }`}>
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link 
              to="/auth/register/vendor" 
              className="text-gray-600 hover:text-gray-900 text-sm inline-flex items-center gap-2"
            >
              <ArrowRight size={16} className="rotate-180" />
              <span>Back to Persian Registration / 返回波斯语注册</span>
            </Link>
          </div>

          {/* Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl text-left">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Globe size={20} />
              <span>Why Register as International Vendor?</span>
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Reach Iranian market with 80+ million customers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>List products in your language</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Dedicated support for international sellers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Multiple payment options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

