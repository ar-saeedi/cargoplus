import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Edit, Trash2, MapPin } from 'lucide-react'

export default function AddressesPage() {
  const { t } = useTranslation()
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'منزل',
      fullName: 'علی احمدی',
      phone: '09123456789',
      address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      postalCode: '1234567890',
      isDefault: true,
    },
    {
      id: 2,
      title: 'محل کار',
      fullName: 'علی احمدی',
      phone: '09123456789',
      address: 'تهران، خیابان آزادی، پلاک ۴۵۶',
      postalCode: '9876543210',
      isDefault: false,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('dashboard.addresses')}</h1>
            <p className="text-gray-600">مدیریت آدرس‌های ارسال</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={20} />
            افزودن آدرس جدید
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border-2 rounded-lg p-4 hover:border-primary-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary-600" />
                  <span className="font-bold">{address.title}</span>
                  {address.isDefault && (
                    <span className="badge badge-success text-xs">پیش‌فرض</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-red-50 rounded">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">گیرنده: </span>
                  <span className="font-medium">{address.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-600">تلفن: </span>
                  <span dir="ltr" className="font-medium">{address.phone}</span>
                </div>
                <div className="text-gray-700">{address.address}</div>
                <div>
                  <span className="text-gray-600">کد پستی: </span>
                  <span dir="ltr" className="font-medium">{address.postalCode}</span>
                </div>
              </div>

              {!address.isDefault && (
                <button className="mt-4 text-sm text-primary-600 hover:text-primary-700">
                  تنظیم به عنوان آدرس پیش‌فرض
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

