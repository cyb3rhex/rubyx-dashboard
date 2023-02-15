const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

const config = {
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  variants: {
    backgroundOpacity: ['responsive', 'hover', 'focus'],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'active',
      'odd',
    ],
    display: ['responsive', 'dark'],
    textColor: [
      'responsive',
      'focus',
      'focus-within',
      'hover',
      'active',
    ],
    placeholderColor: ['responsive', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    divideColor: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    margin: ['responsive', 'last'],
  },
  plugins: [],
}

module.exports = {
  ...windmill(config),
  ...config,
}