/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx, js}'],
  theme: {
    colors: {
      brand: '#0c90e4',
      subBrand: '#9775fa',
      accent: '#7345fc',
      white: '#ffffff',
      black: '#000000',
      darkGray: '#4d4d4d',
      lightGray: '#7c7979',
      superLightGray: '#CCCCCC',
      slate500: 'rgb(100 116 139)',
      tweetOwner: 'rgb(51 65 85)',
      tweetParticipant: '#f8f9fa',
      tweetBG: 'rgb(203 213 225)',
      signupLoginBG: '#faf8fe',
    },
    backgroundImage: {
      headingBG: `url('../public/images/heading.gif')`,
      talkBG: `url('../public/images/talkBG.png')`,
    },
    extend: {
      rotate: {
        '17': '17deg',
      },
    },
  },
  plugins: [],
};
