import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from './store/authStore'
import LoadingScreen from './components/LoadingScreen'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import VendorLayout from './layouts/VendorLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProductListPage from './pages/products/ProductListPage'
import ProductDetailPage from './pages/products/ProductDetailPage'
import CartPage from './pages/cart/CartPage'
import CheckoutPage from './pages/checkout/CheckoutPage'

// Buyer Dashboard Pages
import BuyerDashboard from './pages/dashboard/BuyerDashboard'
import OrdersPage from './pages/dashboard/OrdersPage'
import FavoritesPage from './pages/dashboard/FavoritesPage'
import AddressesPage from './pages/dashboard/AddressesPage'

// Vendor Dashboard Pages
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorProductsPage from './pages/vendor/VendorProductsPage'
import VendorOrdersPage from './pages/vendor/VendorOrdersPage'
import AddProductPage from './pages/vendor/AddProductPage'

// Other Pages
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { i18n } = useTranslation()
  const { checkAuth, isLoading } = useAuthStore()
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    // Set RTL direction
    document.documentElement.dir = i18n.dir()
    document.documentElement.lang = i18n.language
    
    // Check authentication on mount
    const init = async () => {
      try {
        await checkAuth()
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setInitializing(false)
      }
    }
    
    init()
  }, [checkAuth])

  if (initializing || isLoading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Buyer Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<BuyerDashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="addresses" element={<AddressesPage />} />
      </Route>

      {/* Vendor Dashboard Routes */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<VendorProductsPage />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="orders" element={<VendorOrdersPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

