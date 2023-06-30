/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-yellow)",
        "black": "var(--color-black)",
        "gray": "var(--color-gray)",
        "cream": "var(--color-white)",
      },
      screens: {
        "tablet": "720px",
        "laptop": "920px"
      }
    },
  },
  plugins: [],
}

