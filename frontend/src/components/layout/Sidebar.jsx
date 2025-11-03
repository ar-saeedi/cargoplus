import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  X,
  Home,
  ShoppingBag,
  Package,
  Store,
  Globe,
  LayoutGrid,
  User
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  const categories = [
    { name: t('category.womenClothing'), link: '/products?category=women', icon: '👗' },
    { name: t('category.menClothing'), link: '/products?category=men', icon: '👔' },
    { name: t('category.electronics'), link: '/products?category=electronics', icon: '📱' },
    { name: t('category.shoes'), link: '/products?category=shoes', icon: '👟' },
    { name: t('category.bags'), link: '/products?category=bags', icon: '👜' },
    { name: t('category.homeAppliances'), link: '/products?category=home', icon: '🏠' },
    { name: t('category.sports'), link: '/products?category=sports', icon: '⚽' },
    { name: t('category.toys'), link: '/products?category=toys', icon: '🧸' },
  ]

  const menuSections = [
    {
      title: t('common.home'),
      icon: Home,
      link: '/',
    },
    {
      title: 'دسته‌بندی محصولات',
      icon: LayoutGrid,
      submenu: categories.map(cat => ({ label: cat.name, link: cat.link })),
    },
    {
      title: 'خدمات ویژه',
      icon: Package,
      submenu: [
        { label: '⚡ فروش ویژه', link: '/products?special=flash' },
        { label: '📈 پرفروش‌ترین', link: '/products?special=trending' },
        { label: '🆕 تازه‌ها', link: '/products?special=new' },
        { label: '💰 تخفیف‌دار', link: '/products?discount=true' },
      ],
    },
    ...(isAuthenticated ? [
      {
        title: t('nav.orders'),
        icon: ShoppingBag,
        submenu: [
          { label: t('order.pending'), link: '/dashboard/orders?status=pending' },
          { label: t('order.processing'), link: '/dashboard/orders?status=processing' },
          { label: t('order.shipped'), link: '/dashboard/orders?status=shipped' },
          { label: t('order.delivered'), link: '/dashboard/orders?status=delivered' },
        ]
      },
      {
        title: t('nav.products'),
        icon: Package,
        submenu: [
          { label: t('cart.title'), link: '/cart' },
          { label: t('nav.favorites'), link: '/dashboard/favorites' },
          { label: t('product.title'), link: '/products' },
        ]
      },
      {
        title: t('category.womenClothing'),
        icon: LayoutGrid,
        link: '/products?category=women',
      },
      {
        title: t('nav.vendors'),
        icon: Store,
        link: '/vendors',
      },
      {
        title: t('dashboard.buyerCenter'),
        icon: User,
        link: '/dashboard',
      },
    ] : []),
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[110]"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Only shows as overlay when opened */}
      <aside 
        className={`
          fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-[120] 
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary-600 to-primary-500 text-white">
          <h2 className="font-bold text-xl">منوی اصلی</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          {menuSections.map((section, index) => {
            const Icon = section.icon
            return (
              <div key={index} className="mb-2">
                {section.link ? (
                  <Link
                    to={section.link}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors group"
                  >
                    <Icon size={22} className="text-gray-600 group-hover:text-primary-600" />
                    <span className="font-medium">{section.title}</span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                      <Icon size={22} className="text-primary-600" />
                      <span className="font-bold text-gray-800">{section.title}</span>
                    </div>
                    {section.submenu && (
                      <div className="mr-8 space-y-1 mb-3">
                        {section.submenu.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.link}
                            onClick={onClose}
                            className="block p-2.5 hover:bg-primary-50 hover:text-primary-600 rounded text-sm text-gray-600 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </nav>

        {!isAuthenticated && (
          <div className="p-4 border-t bg-gradient-to-br from-primary-50 to-secondary-50">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              برای دسترسی به امکانات بیشتر وارد شوید
            </p>
            <Link 
              to="/auth/login"
              onClick={onClose}
              className="btn btn-primary w-full mb-2"
            >
              {t('common.login')}
            </Link>
            <Link 
              to="/auth/register"
              onClick={onClose}
              className="btn btn-outline w-full"
            >
              {t('common.register')}
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

