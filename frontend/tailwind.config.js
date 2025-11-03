/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',    // Mobile S
      'sm': '375px',    // Mobile M  
      'md': '425px',    // Mobile L
      'lg': '768px',    // Tablet
      'xl': '1024px',   // Laptop
      '2xl': '1440px',  // Laptop L
      '3xl': '2560px',  // 4K
    },
    extend: {
      fontFamily: {
        'sans': ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          'xs': '0.75rem',
          'sm': '1rem',
          'lg': '1.5rem',
          'xl': '2rem',
          '2xl': '4rem',
          '3xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}

