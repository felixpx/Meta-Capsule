module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{html,js,tsx}', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    typography: (theme) => ({}),
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
}
