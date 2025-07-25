import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "2rem",
        "2xl": "3rem",
      },
    },
  },
  plugins: [
    heroui(),
  ],
} satisfies Config;
