/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif'],
      'lato-light': ['Lato', 'sans-serif', '900'],
    },
    screens: {
      'sm':{ 'max':'767px'},
      'md':{ 'max':'1023px'},
      'lg':{ 'min':'1280px'},
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
}
