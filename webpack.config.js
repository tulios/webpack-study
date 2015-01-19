var path = require('path')
var webpack = require('webpack')
var env = process.env['NODE_ENV'] || 'dev'

var SaveAssetsJson = require('assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    path: __dirname + '/build/public/assets',
    filename: 'app-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

if (/^(dev|test)/.test(env)) {
  configs.entry.app = ['webpack/hot/dev-server'].concat(configs.entry.app);
  configs.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'))
  configs.plugins.push(new ExtractTextPlugin("app-bundle.css"))

} else if (/^prod/.test(env)) {
  configs.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle-[hash].js'))
  configs.plugins.push(new ExtractTextPlugin("app-bundle-[hash].css"))

  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }))

  configs.plugins.push(new SaveAssetsJson({
    filename: 'manifest.json',
    path: path.join(__dirname, 'build')
  }))

  configs.output.filename = configs.output.filename.replace(/\.js$/, '-[hash].js')
}

module.exports = configs;
