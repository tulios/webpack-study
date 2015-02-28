var gulp = require('gulp');

var del = require('del');
var gutil = require('gulp-util');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var configs = require('./configs');

gulp.task('clean', function(callback) {
  del([
    'build/**/*.js',
    'build/**/*.css',
    'build/**/*.json'
  ], callback)
});

gulp.task('build', ['clean'], function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true
    }))
    callback()
  })
});

gulp.task('update-styles', function() {
  var cssManifest = require('./lib/gulp-css-manifest');

  gulp.src(configs.css.files, {read: false, base: './src'}).
    pipe(cssManifest({filename: 'styles.js'})).
    pipe(gulp.dest('./src'));
});

gulp.task('new:view', ['create-view', 'update-styles']);
gulp.task('new:widget', ['create-widget', 'update-styles']);

gulp.task('create-view', function() {
  require('./lib/create-component').view(configs.componentsPath);
});

gulp.task('create-widget', function() {
  require('./lib/create-component').widget(configs.componentsPath);
});

gulp.task('dev-server', function() {
  var express = require('express');
  var proxy = require('proxy-middleware');
  var morgan = require('morgan');
  var url = require('url');

  var devServer = configs.devServer;
  var devServerHost = 'http://' + devServer.host + ':' + devServer.webpackDevServerPort;

  var app = express();
  app.use(morgan('dev'));
  app.use('/public', proxy(url.parse(devServerHost + '/')));
  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/build/public/index.html');
  });

  var WebpackDevServer = require('webpack-dev-server');
  var server = new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true,
    contentBase: 'build/public',
    publicPath: devServerHost + '/',
    hot: true,
    stats: {colors: true}
  });

  server.listen(devServer.webpackDevServerPort, devServer.host, function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('webpack result is served from ' + devServerHost + '/public/');
    gutil.log('Access http://' + devServer.host + ':' + devServer.proxyPort);
  })
  app.listen(devServer.proxyPort);
});
