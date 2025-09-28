/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f8f9f0',
          100: '#f0f2dc',
          200: '#e1e5bd',
          300: '#cdd394',
          400: '#b8c170',
          500: '#889d13',
          600: '#889d13',
          700: '#6b7a0f',
          800: '#56640c',
          900: '#47540a',
        },
      },
    },
  },
  plugins: [],
};
