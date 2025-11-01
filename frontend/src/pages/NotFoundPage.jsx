import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">صفحه مورد نظر یافت نشد</p>
        <Link to="/" className="btn btn-primary">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  )
}

