/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ios: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"San Francisco"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        manrope: ["Manrope", "sans-serif"],
        cp: [
          "nativeCode",
          "nativecode-outfit",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      screens: {
        xs: { max: "430px" },
        tb:{min:"431px", max:"1023px"},
        lp: { min: "1024px",max: "1600px" },
        
      },
    },
  },
  plugins: [],
};
