/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#050505",
          800: "#141414",
          700: "#212328",
          600: "#30333A",
          500: "#9095A1",
          400: "#CCDADC",
        },
        yellow: {
          400: "#FDD458",
          500: "#E8BA40",
        },
        blue: {
          600: "#5862FF",
        },
        teal: {
          400: "#0FEDBE",
        },
        red: {
          500: "#FF495B",
        },
        orange: {
          500: "#FF8243",
        },
        purple: {
          500: "#D13BFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
