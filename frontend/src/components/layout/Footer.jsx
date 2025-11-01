import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react'
import Logo from '../Logo'

export default function Footer() {
  const { t } = useTranslation()

  const footerLinks = {
    about: [
      { label: t('footer.aboutUs'), link: '/about' },
      { label: t('footer.contactUs'), link: '/contact' },
      { label: t('footer.becomeVendor'), link: '/vendor/register' },
      { label: t('footer.helpCenter'), link: '/help' },
    ],
    legal: [
      { label: t('footer.terms'), link: '/terms' },
      { label: t('footer.privacy'), link: '/privacy' },
      { label: t('footer.faq'), link: '/faq' },
    ],
    categories: [
      { label: t('category.womenClothing'), link: '/products?category=women' },
      { label: t('category.menClothing'), link: '/products?category=men' },
      { label: t('category.electronics'), link: '/products?category=electronics' },
      { label: t('category.homeAppliances'), link: '/products?category=home' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Logo size="md" showText={true} className="[&>div:first-child]:shadow-xl [&_span]:text-white [&_span:last-child]:text-gray-300" />
            </div>
            <p className="text-sm mb-4">
              بزرگترین بازار آنلاین B2B و B2C در ایران برای خرید و فروش محصولات متنوع با بهترین قیمت و کیفیت
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Links - About */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.aboutUs')}</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">قوانین و مقررات</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={18} className="flex-shrink-0" />
                <span dir="ltr">021-12345678</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={18} className="flex-shrink-0" />
                <span dir="ltr">info@marketplace.ir</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <h4 className="text-white font-bold mb-4">دسته‌بندی‌های محبوب</h4>
          <div className="flex flex-wrap gap-3">
            {footerLinks.categories.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>
            {t('footer.copyright')} © {new Date().getFullYear()} - 
            {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}

