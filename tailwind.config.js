/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        stories: '#F2CB05',
        home: '#F2E205',
        travel: '#0D1440',
        web: '#1438A6',
        kitchen: '#BF1736',
        thoughts: '#3FEF3C',
        creative: '#751861'
      },
      gridTemplateRows: {
        layout: '1fr 1fr 50%'
      },
      minHeight: {
        card: '300px'
      }
    }
  },
  variants: {},
  plugins: []
}
