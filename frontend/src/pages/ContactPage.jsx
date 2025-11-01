export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">تماس با ما</h1>
      <div className="max-w-2xl">
        <p className="text-gray-700 mb-6">
          برای ارتباط با ما می‌توانید از راه‌های زیر استفاده کنید:
        </p>
        <div className="space-y-4">
          <div>
            <strong>آدرس:</strong> تهران، خیابان ولیعصر، پلاک ۱۲۳
          </div>
          <div>
            <strong>تلفن:</strong> <span dir="ltr">021-12345678</span>
          </div>
          <div>
            <strong>ایمیل:</strong> <span dir="ltr">info@marketplace.ir</span>
          </div>
        </div>
      </div>
    </div>
  )
}

