/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  purge: false,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1750px',
        '4xl': '1870px',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { 'background-color': 'currentColor' },
          '50%': { 'background-color': 'transparent' },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        blink: 'blink 1.2s infinite steps(1, start)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { 'background-color': 'currentColor' },
          '50%': { 'background-color': 'transparent' },
        },
      },
      width: {
        sider: '60px',
      },
      minHeight: {
        28: '28px',
      },
      backgroundColor: {
        lightBg:
          'linear-gradient(145deg, #F7F9FA 0%, #D9E9F0 50%, #F7F9FA 100%)',
      },
      colors: {
        primary: {
          // Tailwind Indigo
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          // Tailwind Blue
          // 50: '#eff6ff',
          // 100: '#dbeafe',
          // 200: '#bfdbfe',
          // 300: '#93c5fd',
          // 400: '#60a5fa',
          // 500: '#3b82f6',
          // 600: '#2563eb',
          // 700: '#1d4ed8',
          // 800: '#1e40af',
          // 900: '#1e3a8a',
          // 950: '#172554',
          // Tailwind Pink
          // 50: '#fdf2f8',
          // 100: '#fce7f3',
          // 200: '#fbcfe8',
          // 300: '#f9a8d4',
          // 400: '#f472b6',
          // 500: '#ec4899',
          // 600: '#db2777',
          // 700: '#be185d',
          // 800: '#9d174d',
          // 900: '#831843',
          // 950: '#500724',
          // Tailwind Green
          // 50: '#f0fdf4',
          // 100: '#dcfce7',
          // 200: '#bbf7d0',
          // 300: '#86efac',
          // 400: '#4ade80',
          // 500: '#22c55e',
          // 600: '#16a34a',
          // 700: '#15803d',
          // 800: '#166534',
          // 900: '#14532d',
          // 950: '#052e16',
        },
      },
    },
  },
  plugins: ['@tailwindcss/typography'],
};
