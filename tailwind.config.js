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
        cyber: {
          black: "#0a0c10",
          steel: "#121620",
          border: "#1e2638",
          amber: "#f59e0b",
          "amber-glow": "rgba(245, 158, 11, 0.15)",
        },
      },
    },
  },
  plugins: [],
};
