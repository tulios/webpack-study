var gulp = require('gulp')

var del = require('del')
var gutil = require('gulp-util')

var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

gulp.task('clean', function(callback) {
  del(['build/**/*.js', 'build/**/*.css'], callback)
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
  var configs = require('./configs');

  gulp.src(configs.css.files, {read: false, base: './src'}).
    pipe(cssManifest({filename: 'styles.js'})).
    pipe(gulp.dest('./src'));
});
