module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['COCOGOOSE', 'sans-serif'],
        nunito: ['nunito', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        sm: { max: '768px' },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
