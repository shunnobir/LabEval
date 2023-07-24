/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        red: {
          600: "var(--red-600)",
        },
        blue: {
          500: "var(--blue-500)",
          600: "var(--blue-600)",
        },
        yellow: {
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
        },
        slate: {
          900: "var(--slate-900)",
          800: "var(--slate-800)",
          700: "var(--slate-700)",
          600: "var(--slate-600)",
          500: "var(--slate-500)",
          400: "var(--slate-400)",
          300: "var(--slate-300)",
          200: "var(--slate-200)",
          100: "var(--slate-100)",
          50: "var(--slate-50)",
        },
      },

      keyframes: {
        opacity: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },

      animation: {
        opacity: "opacity 350ms ease-in 1 forwards",
      },
    },
  },
  plugins: [],
};
