import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { useState } from 'react'

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* Sidebar as overlay only - no fixed sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main content takes full width */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

