module.exports = {
  env: process.env['NODE_ENV'] || 'development',
  output: './build/public/assets',
  componentsPath: './src/client/components',
  devServer: {
    proxyPort: 8082,
    webpackDevServerPort: 8083,
    host: 'localhost'
  },
  js: {
    vendor: [
      'jquery',
      'react',
      'react-router',
      './src/vendor/standalone-library'
    ],
    alias: {
      'app': './src/client',
      'standalone-library$': './src/vendor/standalone-library'
    }
  },

  css: {
    files: [
      './src/stylesheets/**/*.css',
      './src/stylesheets/**/*.scss',
      './src/client/components/widgets/**/**/*.css',
      './src/client/components/widgets/**/**/*.scss',
      './src/client/components/views/**/**/*.css',
      './src/client/components/views/**/**/*.scss'
    ],
    includes: [
      './src/stylesheets/app'
    ]
  }
}
