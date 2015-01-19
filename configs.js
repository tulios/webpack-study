module.exports = {
  js: {
    vendor: [
      'jquery',
      'react',
      'react-router',
      './src/vendor/standalone-library'
    ]
  },

  css: {
    files: [
      './src/stylesheets/**/*.css',
      './src/stylesheets/**/*.scss',
      './src/components/widgets/**/**/*.css',
      './src/components/widgets/**/**/*.scss',
      './src/components/views/**/**/*.css',
      './src/components/views/**/**/*.scss'
    ]
  }
}
