/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to your components
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'], // Adding Lato with fallback to sans-serif
      },
    },
  },
  plugins: [],
}

