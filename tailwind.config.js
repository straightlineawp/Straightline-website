/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['"Barlow Condensed"', 'Oswald', 'Roboto Condensed', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
          accent: '#F97316', // Safety Orange
          accentLight: '#fb923c',
          secondary: '#1E40AF', // Deep Steel Blue
        }
      }
    },
  },
  plugins: [],
}
