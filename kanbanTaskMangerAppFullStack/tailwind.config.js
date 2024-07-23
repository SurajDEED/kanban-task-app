/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        'darkPurpel': '#635FC7',
        'lightP': '#A8A4FF',
        'darkBlack': '#000112',
        'lightBlack1': '#20212c',
        'lightBlack2': '#2B2C37',
        'lightBlack3': '#3E3F4E',
        'lightBlueish': '#F4F7FD',
        'lightPurpel': '#e9e8fa',
        'lightGrey': '#E4EBFA',
        'customWhite': '#FFFFFF',
        'customRed1': '#EA5555',
        'customRed2': '#FF9898',
      },
      textColor: {
        'darkPurpel': '#635FC7',
        'lightP': '#A8A4FF',
        'darkBlack': '#000112',
        'lightBlack1': '#20212c',
        'lightBlack2': '#2B2C37',
        'lightBlack3': '#3E3F4E',
        'lightBlueish': '#F4F7FD',
        'lightPurpel': '#e9e8fa',
        'customGrey': '#828FA3',
        'lightGrey': '#E4EBFA',
        'customWhite': '#FFFFFF',
        'customRed1': '#EA5555',
        'customRed2': '#FF9898',
      },
      fontFamily: {
        pjs: ["Plus Jakarta Sans", "sans-serif"],
       },
      screens: {
        'xs': { 'min': '200px', 'max': '639px' },
      },
    },
  },
  plugins: [],
}