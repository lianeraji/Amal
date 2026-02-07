//Liane Raji
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        amal: {
          red: '#E4312b',
          green: '#009736',
          black: '#000000',
          white: '#ffffff',
          yellow: '#FFD700',
          'light-green': '#e6f4ea',
          'light-red': '#fce8e8',
          'light-yellow': '#fff9c4',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
