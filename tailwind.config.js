/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        '2md':'960px'
      },
      colors:{
        primary:"#DB4444",
        primaryText:'#000000'
      },fontFamily:{
        Inter:['Poppins','sans-serif'],
    },},
  },
  plugins: [],
}