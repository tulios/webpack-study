var gulp = require('gulp')
var del = require('del')
var gutil = require('gulp-util')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

gulp.task('clean', function(callback) {
  del(['build/**/*.js'], callback)
})

gulp.task('build', ['clean'], function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      // output options
    }))
    callback()
  })
})
