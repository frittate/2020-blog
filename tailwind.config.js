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
        layout: '1fr 1fr'
      },
      gridTemplateColumns: {
        postCardGrid: 'repeat(auto-fill, minMax(260px, 1fr))'
      },
      minHeight: {
        card: '300px'
      },
      maxWidth: {
        hd: '1920px'
      },
      flex: {
        thirds: '0 0 32%'
      }
    },
    variants: {
      marginLeft: ['last']
    }
  },
  plugins: []
}
