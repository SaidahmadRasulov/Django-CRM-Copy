/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': "#ECECEC",
        'blue': '#558BD9'
      },
      height: {
        'fully': '100vh'
      }
    },
  },
  plugins: [],
}