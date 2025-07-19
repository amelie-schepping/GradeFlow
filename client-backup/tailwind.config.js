import { createPreset } from "tailwindcss-shadcn-ui";

export default {
  presets: [createPreset()],
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
