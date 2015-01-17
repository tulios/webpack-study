var webpack = require('webpack')
var env = process.env['NODE_ENV'] || 'dev'

var configs = {
  context: __dirname,
  debug: false,
  entry: {
    app: ['./src/app.jsx'],
    vendor: [
      'jquery',
      'react',
      'react-router',
      './src/vendor/standalone-library'
    ]
  },
  output: {
    jsonpFunction: 'wload',
    path: __dirname + '/build',
    filename: 'app-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.coffee', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}

if (/^(dev|test)/.test(env)) {
  configs.entry.app = ['webpack/hot/dev-server'].concat(configs.entry.app);

} else if (/^prod/.test(env)) {
  console.log('production env')
  configs.plugins.push(new UglifyJsPlugin({ sourceMap: false }))
}

module.exports = configs;
