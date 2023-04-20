/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      margin: {
        '27vh': '27vh',
      },
      backgroundImage: {
        'edit-modal-pattern':
          "url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1681966587/KPA%20Test/edit-bg-tile_y3oshj.png')",
        'add-modal-pattern':
          "url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1681966396/KPA%20Test/add-bg-tile_y119m5.png')",
      },
      width: {
        1440: '1440px',
      },
      maxWidth: {
        1440: '1440px',
        1090: '1090px',
        550: '550px',
      },
      maxHeight: {
        650: '650px',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
      'charcoal-900': '#33312F',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      eggshell: '#EEE6E1',
      charcoal: '#565452',
      'charcoal-100': '#827F7C',
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
