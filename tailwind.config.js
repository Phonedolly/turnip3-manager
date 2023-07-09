/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'header-helper-text': 'header-helper-text 1.4s ease 0s infinite normal forwards'
      },
      fontFamily: {
        'sans': ['Spoqa Han Sans Neo', ...defaultTheme.fontFamily.sans],
        'mono': ['Cascadia Mono', ...defaultTheme.fontFamily.mono]
      },
      keyframes: {
        'header-helper-text': {
          '0%, 100%': {
            transform: 'translateX(0%)',
            transformOrigin: '50% 50%',
          },
          '15%': {
            transform: 'translateX(-30px) rotate(-6deg)'
          }
          ,
          '30%': {
            transform: 'translateX(15px) rotate(6deg)'
          },

          '45%': {
            transform: 'translateX(-15px) rotate(-3.6deg)'
          },
          '60%': {
            transform: 'translateX(9px) rotate(2.4deg)'
          },
          '75%': {
            transform: 'translateX(-6px) rotate(-1.2deg)'
          }
        }
      }
    },
  },
  plugins: [],
}

