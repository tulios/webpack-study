module.exports = {
  env: process.env['NODE_ENV'] || 'development',
  js: {
    vendor: [
      'jquery',
      'react',
      'react-router',
      './src/vendor/standalone-library'
    ],
    alias: {
      'standalone-library$': './src/vendor/standalone-library'
    }
  },

  css: {
    files: [
      './src/stylesheets/**/*.css',
      './src/stylesheets/**/*.scss',
      './src/components/widgets/**/**/*.css',
      './src/components/widgets/**/**/*.scss',
      './src/components/views/**/**/*.css',
      './src/components/views/**/**/*.scss'
    ],
    includes: [
      './src/stylesheets/app'
    ]
  }
}
