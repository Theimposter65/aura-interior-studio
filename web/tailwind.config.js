/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#FAF8F5',   // Cream / Alabaster
          100: '#F4EFEB',  // Warm Linen
          200: '#E7DDD3',  // Oat / Light Sand
          300: '#D5C4B4',  // Warm Greige
          400: '#B89F8B',  // Muted Clay
          500: '#9B7E67',  // Bronze Earth
          600: '#7E634F',  // Deep Walnut
          700: '#614B3B',  // Espresso
          800: '#3D3126',  // Charcoal Umber
          900: '#1F1A14',  // Deep Noir
          950: '#120F0C',  // Obsidian Studio
        },
        sage: {
          50: '#F4F7F5',
          100: '#E4ECE6',
          200: '#C7D9CC',
          500: '#698772',
          700: '#435C4A',
        },
        terracotta: {
          50: '#FDF7F5',
          100: '#F9ECE5',
          300: '#E4AB95',
          500: '#C86D51',
          700: '#8F452E',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'art': '0 20px 40px -15px rgba(31, 26, 20, 0.08)',
        'art-lg': '0 30px 60px -20px rgba(31, 26, 20, 0.15)',
        'frame': '0 10px 30px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
