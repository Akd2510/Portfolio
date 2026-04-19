/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#4AF626',
          amber: '#FFB000',
          cyan: '#00FFFF',
        }
      }
    },
  },
  plugins: [],
}
