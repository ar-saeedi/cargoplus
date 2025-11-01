import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  User, 
  Settings,
  FileText
} from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function DashboardLayout() {
  const { t } = useTranslation()
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: t('dashboard.myDashboard'), icon: User },
    { path: '/dashboard/orders', label: t('order.title'), icon: ShoppingBag },
    { path: '/dashboard/favorites', label: t('nav.favorites'), icon: Heart },
    { path: '/dashboard/addresses', label: t('dashboard.addresses'), icon: MapPin },
    { path: '/dashboard/settings', label: t('dashboard.accountSettings'), icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="card p-4 sticky top-4">
              <h2 className="text-lg font-bold mb-4 pb-4 border-b">
                {t('dashboard.buyerCenter')}
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

