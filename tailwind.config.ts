/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        "primary-color": "#E11E39",
      },
      textColor: {
        main: "#00A0C6",
        second: "#7FC41B",
      },
      backgroundColor: {
        main: "#f7f6f2",
        second: "#00A0C6",
        rowTable: "#EFF3F8",
        disabled: "#c2c2c2",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-in forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards",
      },
      height: {
        header: "74px",
      },
    },
  },
  plugins: [],
};
