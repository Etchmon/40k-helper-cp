/** @type {import('tailwindcss').Config} */
// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "mocha",
    }),
  ],
};
