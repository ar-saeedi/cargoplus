import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  Store
} from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useAuthStore } from '../store/authStore'

export default function VendorLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const { user } = useAuthStore()
  
  const isInternational = user?.user_metadata?.is_international === true || user?.user_metadata?.is_international === 'true'
  const language = user?.user_metadata?.language
  
  if (isInternational || (language && language !== 'fa')) {
    return <Navigate to="/vendor/international" replace />
  }

  const menuItems = [
    { path: '/vendor', label: t('vendor.dashboard'), icon: LayoutDashboard },
    { path: '/vendor/products', label: t('vendor.products'), icon: Package },
    { path: '/vendor/orders', label: t('vendor.orders'), icon: ShoppingCart },
    { path: '/vendor/store-page', label: 'صفحه فروشگاه', icon: Store },
    { path: '/vendor/sales', label: t('vendor.sales'), icon: BarChart3 },
    { path: '/vendor/customers', label: t('vendor.customers'), icon: Users },
    { path: '/vendor/settings', label: t('vendor.storeSettings'), icon: Settings },
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
                {t('dashboard.vendorCenter')}
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

