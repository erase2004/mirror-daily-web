/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './shared-components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '720px',
      lg: '1200px',
    },
    extend: {
      colors: {},
      backgroundImage: {
        'image-mask':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.54%, #000 100%)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hover-or-active', ['&:hover', '&:active'])
    }),
  ],
}
