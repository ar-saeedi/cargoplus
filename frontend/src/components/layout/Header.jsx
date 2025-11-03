import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  Bell,
  MessageSquare,
  ChevronDown,
  Store
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import Logo from '../Logo'

export default function Header({ onMenuClick }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()
  const { items } = useCartStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-[100]">
      {/* Main Header Bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Hamburger Menu Button & Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>

              <Link to="/">
                <Logo size="md" showText={true} className="hidden sm:flex" />
                <Logo size="md" showText={false} className="flex sm:hidden" />
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصولات، دسته‌بندی یا فروشنده..."
                  className="w-full py-3 px-5 pr-12 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
                <button 
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* Favorites */}
                  <Link 
                    to="/dashboard/favorites" 
                    className="hidden md:flex p-2.5 hover:bg-gray-100 rounded-lg relative transition-colors group"
                    title={t('nav.favorites')}
                  >
                    <Heart size={22} className="group-hover:text-red-500 transition-colors" />
                  </Link>
                  
                  {/* Cart */}
                  <Link 
                    to="/cart" 
                    className="p-2.5 hover:bg-gray-100 rounded-lg relative transition-colors group"
                    title={t('nav.cart')}
                  >
                    <ShoppingCart size={22} className="group-hover:text-primary-600 transition-colors" />
                    {totalCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium px-1 shadow-md">
                        {totalCartItems}
                      </span>
                    )}
                  </Link>

                  {/* Notifications */}
                  <button className="hidden md:flex p-2.5 hover:bg-gray-100 rounded-lg relative transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-white font-medium">
                        {user?.user_metadata?.full_name?.charAt(0) || 'ک'}
                      </div>
                      <ChevronDown size={16} className="hidden sm:block" />
                    </button>

                    {showUserMenu && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border py-2 z-[200]">
                        <div className="px-4 py-3 border-b">
                          <p className="font-medium text-gray-900">{user?.user_metadata?.full_name || 'کاربر'}</p>
                          <p className="text-sm text-gray-500 truncate" dir="ltr">{user?.email}</p>
                        </div>
                        {user?.user_metadata?.user_type === 'buyer' && (
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User size={18} />
                            <span>{t('common.dashboard')}</span>
                          </Link>
                        )}
                        {user?.user_metadata?.user_type === 'vendor' && (
                          <Link
                            to="/vendor"
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Store size={18} />
                            <span>{t('dashboard.vendorCenter')}</span>
                          </Link>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            handleLogout()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center gap-2 w-full text-right px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <span className="text-lg">→</span>
                          <span>{t('common.logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/auth/login" className="hidden sm:block px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
                    {t('common.login')}
                  </Link>
                  <Link to="/auth/register" className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors shadow-md hover:shadow-lg">
                    {t('common.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}

