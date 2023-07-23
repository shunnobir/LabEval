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
          600: "#d3493a",
        },
        blue: {
          600: "#4282cd",
        },
        yellow: {
          600: "#ffbe39",
        },
        slate: {
          900: "#151720",
          300: "#cbd5e1",
          200: "#e2e8f0",
          50: "#f0f8fc",
        },
      },
    },
  },
  plugins: [],
};
