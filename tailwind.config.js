/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary theme colors
        primary: {
          DEFAULT: '#7C1F2C', // Main primary color
          light: '#F9F7F4',   // Selected item background
          dark: '#5A1620',    // Darker shade for hover states
          50: '#FEF6F7',
          100: '#FCE8EA',
          200: '#F9D1D6',
          300: '#F4A9B3',
          400: '#EC7789',
          500: '#E04560',
          600: '#7C1F2C',     // Your primary color
          700: '#6A1A26',
          800: '#581521',
          900: '#46111B',
        },
        // Neutral colors
        neutral: {
          DEFAULT: '#6B7280',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Semantic colors
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#065F46',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
      },
      backgroundColor: {
        'sidebar': '#7C1F2C',
        'sidebar-item': '#F9F7F4',
        'sidebar-hover': 'rgba(255, 255, 255, 0.1)',
      },
      textColor: {
        'sidebar': '#FFFFFF',
        'sidebar-item': '#7C1F2C',
        'sidebar-hover': '#FFFFFF',
      },
      borderColor: {
        'sidebar': 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}