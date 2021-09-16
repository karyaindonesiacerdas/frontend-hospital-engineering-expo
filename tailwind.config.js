module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f7f7",
          100: "#d3f0f7",
          200: "#a1e4ee",
          300: "#69c8d6",
          400: "#30a7b8",
          500: "#238a99",
          600: "#1e717e",
          700: "#1b5662",
          800: "#153a47",
          900: "#0d2432",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
