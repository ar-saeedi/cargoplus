// Format currency in Persian
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
  }).format(price).replace('ریال', 'تومان')
}

// Format date in Persian
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Convert to Persian numbers
export const toPersianNumber = (num) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return String(num).replace(/\d/g, (digit) => persianDigits[digit])
}

// Get order status color
export const getOrderStatusColor = (status) => {
  const colors = {
    pending: 'badge-warning',
    processing: 'badge-info',
    shipped: 'badge-info',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
  }
  return colors[status] || 'badge-info'
}

// Get order status text
export const getOrderStatusText = (status) => {
  const texts = {
    pending: 'در انتظار پرداخت',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل داده شده',
    cancelled: 'لغو شده',
  }
  return texts[status] || status
}

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validate phone number (Iranian)
export const isValidPhone = (phone) => {
  const re = /^09\d{9}$/
  return re.test(phone)
}

// Generate slug from text
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Get image URL from Supabase
export const getImageUrl = (path) => {
  if (!path) return '/placeholder-image.jpg'
  if (path.startsWith('http')) return path
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${path}`
}

