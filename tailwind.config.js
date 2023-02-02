/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx, js}'],
  theme: {
    extend: {
      colors: {
        brand: '#0c90e4',
      },
      rotate: {
        '17': '17deg',
      },
    },
  },
  plugins: [],
};