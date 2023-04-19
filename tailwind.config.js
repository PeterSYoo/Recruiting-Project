/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'edit-modal-pattern': "url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1681865322/KPA%20Test/Edit%20Modal/bg-tile_udexmd.png')"
      },
      width: {
        1440: '1440px',
      },
      maxWidth: {
        1440: '1440px',
        1090: '1090px',
        550: '550px'
      },
      maxHeight: {
        650: '650px'
      }
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
      'charcoal-900': '#33312F'
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
      'charcoal-100': '#827F7C'
    }),
    borderColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
    }),
    fontFamily: {
      sans: ['VT323', 'Sans-serif'],
    },
  },
  plugins: [],
};
