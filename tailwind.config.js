/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 🚨 CHANGE HERE: Renamed 'olive' to 'primary' and updated shades to blue
        primary: { 
          50: '#eff6ff',    // Very Light Blue
          100: '#dbeafe',   // Lighter Blue
          200: '#bfdbfe',   // Light Blue
          300: '#93c5fd',   // Medium-Light Blue
          400: '#60a5fa',   // Medium Blue
          500: '#3b82f6',   // **Main Blue** (e.g., brand color)
          600: '#2563eb',   // Medium-Dark Blue
          700: '#1d4ed8',   // Dark Blue
          800: '#1e40af',   // Darker Blue
          900: '#1e3a8a',   // Very Dark Blue
        },
      },
    },
  },
  plugins: [],
};