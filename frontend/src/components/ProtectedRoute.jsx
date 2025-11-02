import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function ProtectedRoute({ children, requiredType }) {
  const { isAuthenticated, user } = useAuthStore()

  // Not logged in - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // Get user type from metadata
  const userType = user?.user_metadata?.user_type || 'buyer'

  // Check if user has correct type
  if (requiredType && userType !== requiredType) {
    // Vendor trying to access buyer dashboard - redirect to vendor panel
    if (requiredType === 'buyer' && userType === 'vendor') {
      return <Navigate to="/vendor" replace />
    }
    
    // Buyer trying to access vendor panel - redirect to buyer dashboard
    if (requiredType === 'vendor' && userType === 'buyer') {
      return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

export function BuyerRoute({ children }) {
  return <ProtectedRoute requiredType="buyer">{children}</ProtectedRoute>
}

export function VendorRoute({ children }) {
  return <ProtectedRoute requiredType="vendor">{children}</ProtectedRoute>
}

