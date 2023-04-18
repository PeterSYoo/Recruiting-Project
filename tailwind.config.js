/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      width: {
        1440: '1440px',
      },
      maxWidth: {
        1440: '1440px',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
    }),
    textColor: {
      charcoal: '#565452',
    },
    fontFamily: {
      sans: ['VT323', 'Sans-serif'],
    },
  },
  plugins: [],
};
