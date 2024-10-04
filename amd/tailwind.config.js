/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'selector', // This enables dark mode based on the presence of the "dark" class in the HTML tag
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('tailwindcss-primeui')],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      aria: {
        current: 'current="page"'
      }
    }
  }
}
