var through = require('through2');
var gutil = require('gulp-util')
var path = require('path');
var File = gutil.File;

module.exports = function(opts) {
  var styleRequires = [];
  var base;

  var bufferRequires = function(file, encoding, callback) {
    var parts = file.relative.split('\/');
    var filename = parts[parts.length - 1];
    if (!base) base = file.base;

    if (!/^_/.test(filename)) {
      var importPath = './' + file.relative;
      var requireString = "require('" + importPath + "');";
      styleRequires.push(requireString);
    }

    return callback();
  }

  var endStream = function(callback) {
    var file = new File({
      cwd: __dirname,
      base: base,
      path: path.join(base, opts.filename),
      contents: new Buffer(styleRequires.join('\n'))
    });

    this.push(file);
    return callback(null, file);
  }

  return through.obj(bufferRequires, endStream);
}
