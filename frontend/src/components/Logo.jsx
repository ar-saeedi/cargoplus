export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 16 },
    md: { container: 'w-11 h-11', icon: 24 },
    lg: { container: 'w-14 h-14', icon: 32 },
    xl: { container: 'w-20 h-20', icon: 48 },
  }

  const currentSize = sizes[size] || sizes.md

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${currentSize.container} bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        {/* CargoPlus Icon - Truck with Plus */}
        <svg 
          className="text-white" 
          width={currentSize.icon} 
          height={currentSize.icon} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Truck body */}
          <rect x="1" y="8" width="14" height="8" rx="1" />
          <path d="M15 8v8" />
          <path d="M15 12h4l2 2v4h-6" />
          {/* Wheels */}
          <circle cx="5.5" cy="18.5" r="2" fill="currentColor" />
          <circle cx="18.5" cy="18.5" r="2" fill="currentColor" />
          {/* Plus sign on truck */}
          <path d="M8 6V2M6 4h4" strokeWidth="2.5" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 leading-tight ${
            size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg'
          }`}>
            بازار آنلاین
          </span>
          <span className={`text-gray-500 font-semibold ${
            size === 'lg' || size === 'xl' ? 'text-sm' : 'text-xs'
          }`}>
            CargoPlus
          </span>
        </div>
      )}
    </div>
  )
}

