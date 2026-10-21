import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#182522",
        forest: "#1f6654",
        mint: "#e9f2ee",
        canvas: "#f6f7f4",
      },
    },
  },
  plugins: [],
};

export default config;