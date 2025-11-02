import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from './store/authStore'
import LoadingScreen from './components/LoadingScreen'
import { BuyerRoute, VendorRoute } from './components/ProtectedRoute'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import VendorLayout from './layouts/VendorLayout'
import VendorInternationalLayout from './layouts/VendorInternationalLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import RegisterBuyerPage from './pages/auth/RegisterBuyerPage'
import RegisterVendorPage from './pages/auth/RegisterVendorPage'
import RegisterVendorInternationalSinglePage from './pages/auth/RegisterVendorInternationalSinglePage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ProductListPage from './pages/products/ProductListPage'
import ProductDetailPage from './pages/products/ProductDetailPage'
import CartPage from './pages/cart/CartPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import VendorStorePage from './pages/VendorStorePage'

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
import StoreSettingsPage from './pages/vendor/StoreSettingsPage'

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
      <Route path="/auth/register/buyer" element={<RegisterBuyerPage />} />
      <Route path="/auth/register/vendor" element={<RegisterVendorPage />} />
      <Route path="/auth/register/vendor/international" element={<RegisterVendorInternationalSinglePage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      
      {/* Vendor Store Page */}
      <Route path="/store/:vendorId" element={<VendorStorePage />} />

      {/* Buyer Dashboard Routes - Protected for Buyers Only */}
      <Route path="/dashboard" element={<BuyerRoute><DashboardLayout /></BuyerRoute>}>
        <Route index element={<BuyerDashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="addresses" element={<AddressesPage />} />
      </Route>

      {/* Persian Vendor Dashboard Routes */}
      <Route path="/vendor" element={<VendorRoute><VendorLayout /></VendorRoute>}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<VendorProductsPage />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="orders" element={<VendorOrdersPage />} />
        <Route path="store-page" element={<StoreSettingsPage />} />
      </Route>

      {/* International Vendor Dashboard Routes - LTR with Language Dropdown */}
      <Route path="/vendor/international" element={<VendorRoute><VendorInternationalLayout /></VendorRoute>}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<VendorProductsPage />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="orders" element={<VendorOrdersPage />} />
        <Route path="store-page" element={<StoreSettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

