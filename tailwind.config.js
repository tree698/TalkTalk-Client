/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx, js}'],
  theme: {
    colors: {
      brand: '#0c90e4',
      accent: '#7345fc',
      white: '#ffffff',
      signupLoginBG: '#faf8fe',
    },
    backgroundImage: {
      headingBG: `url('../public/images/heading.gif')`,
    },
    extend: {
      rotate: {
        '17': '17deg',
      },
    },
  },
  plugins: [],
};
