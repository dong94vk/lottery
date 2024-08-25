/** @type {import('tailwindcss').Config} */

const colorClasses = ['#68778B', '#12151d']
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  safelist: [...colorClasses.map((color) => `bg-${color}`)],

  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(65.84deg, #00C3FD 25.98%, #0194FE 65.48%)',
        'custom-border-gradient':
          'linear-gradient(90deg, rgba(154,232,255,1) 0%, rgba(154,232,255,1) 100%, rgba(10,154,252,1) 100%)',
      },
    },
  },
  plugins: [],
}
