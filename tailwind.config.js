/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': {'min': '320px', 'max': '479px'},
      'sm': '480px',
      'md': '768px', 
      'lg': '1280px',
    },
    fontSize: {
      sm: ['24px', '22px'],
    },
    extend: {},
  },
  plugins: [],
};

