/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Regular: ["regular", "sans-serif"],
        Bold: ["bold", "sans-serif"],
        Italic: ["italic", "sans-serif"],
        BoldItalic: ["bold-italic", "sans-serif"],
      },
      colors: {
        base: {
          100: "#EBE2CA",
          200: "#E4D7B4",
          300: "#DBCA9A",
        },
        "base-content": "#282425",
        primary: "#EF9994",
        "primary-content": "#282425",
        secondary: "#A4CBB4",
        "secondary-content": "#282425",
        accent: "#DB884f",
        "accent-content": "#282425",
        neutral: "#2E282A",
        "neutral-content": "#EDE6D4",
        info: "#2463EB",
        "info-content": "#D2E1FE",
        success: "#16A349",
        "success-content": "#000901",
        warning: "#D97707",
        "warning-content": "#110500",
        error: "#F35148",
        "error-content": "#150202",
      },
    },
  },
  plugins: [],
};
