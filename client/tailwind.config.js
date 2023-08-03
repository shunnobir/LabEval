/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        red: {
          500: "var(--red-500)",
          600: "var(--red-600)",
        },
        blue: {
          500: "var(--blue-500)",
          600: "var(--blue-600)",
        },
        green: {
          500: "var(--green-500)",
          600: "var(--green-600)",
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

        loader: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },

        popup: {
          "0%": {
            transform: "scale(0)",
          },

          "50%": {
            transform: "scale(1.1)",
          },

          "100%": {
            transform: "scale(1)",
          },
        },

        popdown: {
          "0%": {
            transform: "scale(1)",
          },

          "50%": {
            transform: "scale(1.1)",
          },

          "100%": {
            transform: "scale(0)",
            display: "none",
          },
        },
      },

      animation: {
        opacity: "opacity 500ms ease-in-out 1 normal",
        loader: "loader 750ms ease-in infinite",
        popup: "500ms ease-in-out 1 normal popup",
        popdown: "500ms ease-in-out 1 normal popdown",
      },
    },
  },
  plugins: [],
};
