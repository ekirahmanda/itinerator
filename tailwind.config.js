/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["nord"],
  },
};
