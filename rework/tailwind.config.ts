import type { Config } from "tailwindcss";

const config: Config = {
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
    },
  },
  plugins: [],
};
export default config;
