/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      height: {
        "1-custom": "2px",
      },
      fontSize: {
        "medium-xs": "13px",
      },
      padding: {
        0.5: "1px",
      },
      zIndex: {
        70: "70",
        1: "1",
        200: "200",
      },
      backgroundColor: {
        footer: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
