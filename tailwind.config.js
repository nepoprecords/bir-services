/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bir: {
          orange: '#FF6B00',
          'orange-dark': '#E05A00',
          'orange-light': '#FF8A34',
          amber: '#FFB800',
          yellow: '#FFDE59',
          crimson: '#E02828',
          navy: '#0F172A',
          slate: '#1E293B',
          dark: '#0B0F19',
          gray: '#F3F4F6',
          green: '#10B981',
          'green-dark': '#059669',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        nepali: ['Mukta', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'tactile-orange': '0 5px 0 #C44E00',
        'tactile-orange-active': '0 1px 0 #C44E00',
        'tactile-green': '0 5px 0 #047857',
        'tactile-green-active': '0 1px 0 #047857',
        'tactile-dark': '0 5px 0 #000000',
        'tactile-dark-active': '0 1px 0 #000000',
        'tactile-white': '0 5px 0 #E2E8F0',
        'tactile-white-active': '0 1px 0 #E2E8F0',
        'card-glow': '0 10px 30px -10px rgba(255, 107, 0, 0.15)',
        'hero-glow': '0 0 50px -10px rgba(255, 107, 0, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
