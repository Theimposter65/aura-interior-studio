/** @type {import('tailwindcss').Config} */

// Apple's system font: SF Pro on Apple platforms, Inter as the closest metric match elsewhere.
const appleSans = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Text"',
  '"SF Pro Display"',
  'Inter',
  '"Helvetica Neue"',
  'Helvetica',
  'Arial',
  'sans-serif',
];

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple neutral ramp (light → dark). Kept under the `studio` name so existing surfaces follow.
        studio: {
          50: '#F5F5F7',   // Page / section gray
          100: '#F0F0F2',
          200: '#E8E8ED',  // Hairlines
          300: '#D2D2D7',  // Separators
          400: '#A1A1A6',  // Tertiary label on dark
          500: '#86868B',  // Tertiary label
          600: '#6E6E73',  // Secondary label
          700: '#424245',
          800: '#333336',  // Elevated dark tile
          900: '#1D1D1F',  // Primary label
          950: '#000000',  // Dark section
        },
        // Apple interaction tint
        accent: {
          50: '#E8F2FD',
          light: '#2997FF', // Links & tint on dark surfaces
          DEFAULT: '#0071E3',
          hover: '#0077ED',
          dark: '#0066CC',  // Links on light surfaces
        },
        star: '#FF9F0A', // systemOrange
        sage: {
          50: '#F4F7F5',
          100: '#E4ECE6',
          200: '#C7D9CC',
          500: '#698772',
          600: '#4E6B57',
          700: '#435C4A',
          800: '#2F4335',
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
        sans: appleSans,
        display: ['"SF Pro Display"', ...appleSans],
        serif: ['"SF Pro Display"', ...appleSans],
      },
      borderRadius: {
        tile: '28px',
      },
      boxShadow: {
        'art': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'art-lg': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'frame': '0 10px 30px -10px rgba(0, 0, 0, 0.25)',
        'tile': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'tile-hover': '0 12px 40px rgba(0, 0, 0, 0.10)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 240ms ease-out',
      },
    },
  },
  plugins: [],
}
