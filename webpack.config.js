var path = require('path')
var webpack = require('webpack')

var notHotReload = process.env['HOT'] || 'true'

var SaveAssetsJson = require('assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var appConfigs = require('./configs');
var outputDir = path.join(__dirname, appConfigs.output);

var jsAlias = appConfigs.js.alias;
for (var attr in jsAlias) {
  if (jsAlias.hasOwnProperty(attr) && !/\.\//.test(jsAlias[attr])) {
    jsAlias[attr] = path.join(__dirname, jsAlias[attr]);
  }
}

var sassIncludes = appConfigs.css.includes.map(function(includePath) {
  return 'includePaths[]=' + path.join(__dirname, includePath)
}).join('&')

var configs = {
  context: __dirname,
  debug: false,
  entry: {
    app: ['./src/app.jsx'],
    styles: ['./src/styles.js'],
    vendor: appConfigs.js.vendor
  },
  output: {
    jsonpFunction: 'wload',
    path: outputDir,
    filename: 'app-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?' + sassIncludes)
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    alias: jsAlias
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

if (/^(development|test)/.test(appConfigs.env)) {
  if (notHotReload !== 'false') {
    configs.entry.app = ['webpack/hot/dev-server'].concat(configs.entry.app);
  }

  configs.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'))
  configs.plugins.push(new ExtractTextPlugin('app-bundle.css', {allChunks: true}))

} else if (/^production/.test(appConfigs.env)) {
  configs.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle-[hash].js'))
  configs.output.filename = configs.output.filename.replace(/\.js$/, '-[hash].js')
  configs.plugins.push(new ExtractTextPlugin('app-bundle-[hash].css', {allChunks: true}))

  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: false}))

  configs.plugins.push(new SaveAssetsJson({
    filename: 'manifest.json',
    path: outputDir
  }))
}

module.exports = configs;
