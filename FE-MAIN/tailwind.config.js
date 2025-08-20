/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        colors: {
          primary: '#4f46e5',
          secondary: '#6366f1',
          bg: '#f9fafb',
          muted: '#6b7280',
        },
        borderRadius: {
          DEFAULT: '8px',
        },
        transitionDuration: {
          DEFAULT: '300ms',
        }
      },
  },
  plugins: [require("tailwindcss-animate")],
};
