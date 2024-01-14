import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // red: {
        //   500: "var(--red-500)",
        //   600: "var(--red-600)",
        // },
        // blue: {
        //   500: "var(--blue-500)",
        //   600: "var(--blue-600)",
        // },
        // green: {
        //   500: "var(--green-500)",
        //   600: "var(--green-600)",
        // },
        // yellow: {
        //   500: "var(--yellow-500)",
        //   600: "var(--yellow-600)",
        // },
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        opacity: "opacity 500ms ease-in-out 1 normal",
        loader: "loader 750ms ease-in infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
