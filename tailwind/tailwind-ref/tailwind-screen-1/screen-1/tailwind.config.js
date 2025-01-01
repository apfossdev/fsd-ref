/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          200: "#758a9e",
          500: "#18395f",
          700: "#00274e",
        },
        green: {
          400: "#368ea1",
        },
      },
    },
  },
  plugins: [],
};

