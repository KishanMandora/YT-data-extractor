/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
        dirt: ["Rubik Dirt"],
      },
      animation: {
        fade: "fade 3s linear",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "20%": { opacity: "0.5" },
          "40%": { opacity: "1" },
          "60%": { opacity: ".75" },
          "80%": { opacity: ".5" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["night"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "night",
  },
};
