/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: "#faf6f2", 100: "#f0e8df", 200: "#e2d2c2", 300: "#d4bca5", 400: "#c0a082", 500: "#8B5E3C", 600: "#7A5232", 700: "#694628", 800: "#583A1E", 900: "#472E14" },
        warm: { 50: "#faf7f4", 100: "#f5f0eb", 200: "#ede6df", 300: "#e0d5ca", 400: "#d4c8bc", 500: "#c8b8a9", 600: "#b5a492", 700: "#a2907b", 800: "#8f7c64", 900: "#7c684d" },
        dark: { 50: "#faf6f2", 100: "#f0e8df", 200: "#e2d2c2", 300: "#d4bca5", 400: "#c0a082", 500: "#8B5E3C", 600: "#7A5232", 700: "#694628", 800: "#3D2A1A", 900: "#2D1F14", 950: "#1A120B" }
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "count-up": "countUp 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
