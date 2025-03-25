/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2647', // Navy blue
          light: '#144272',
          dark: '#05142A',
        },
        secondary: {
          DEFAULT: '#8EEDC7', // Light green
          light: '#A6F4D2',
          dark: '#5BD6A2',
        },
      },
    },
  },
  plugins: [],
} 