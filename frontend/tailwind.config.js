/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,jsx,}","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        textGray: "#525252"
      },

      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
}

