/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors: {
        bgrnd: ["#16161a"],
     
     
        btton: ["#FF6500"],
        bttext: ["#fffffe"],
      },
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
      },

    },
    screens:{
      xs:{max:"430px"}
    }
  },
  plugins: [],
};
