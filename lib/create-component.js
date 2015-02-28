var gutil = require('gulp-util')
var path = require('path')
var fs = require('fs')

module.exports = {
  extension: 'jsx',
  view: function(rootPath) {
    var viewsPath = path.join(rootPath, 'views')
    this.createDefaultComponent(viewsPath, 'view')
  },

  widget: function(rootPath) {
    var widgetsPath = path.join(rootPath, 'widgets')
    this.createDefaultComponent(widgetsPath, 'widget')
  },

  createDefaultComponent: function(rootPath, sufix) {
    this.create(rootPath, function(name, componentPath) {
      var componentName = name + '-' + sufix

      fs.mkdirSync(path.join(componentPath, './stylesheets'));
      fs.writeFileSync(path.join(componentPath, './stylesheets/' + componentName + '.scss'), '')
      this.createReactComponent(componentPath, componentName)
    }.bind(this));
  },

  create: function(rootPath, createCallback) {
    var name = process.env['NAME'] || ''
    if (name.length === 0) throw 'NAME is required!'

    gutil.log('Creating', gutil.colors.yellow(name))
    var componentPath = path.join(__dirname, '..', path.join(rootPath, name))

    try {
      fs.mkdirSync(componentPath)
      createCallback(name, componentPath)
      gutil.log('Done')

    } catch(e) {
      if (e.code === 'EEXIST') {
        gutil.log(gutil.colors.red('Aborting') + ',', gutil.colors.yellow(name), 'has already been created')

      } else {
        throw e;
      }
    }
  },

  createReactComponent: function(componentPath, componentName) {
    var className = this.classify(componentName)
    var component = []
    component.push("var React = require('react');")
    component.push('')
    component.push("var " + className + " = React.createClass({")
    component.push("  render: function() {")
    component.push("    return (")
    component.push("      <div className='" + componentName + "'>")
    component.push("      </div>")
    component.push("    )")
    component.push("  }")
    component.push("});")
    component.push('')
    component.push("module.exports = " + className + ";");

    component = component.join('\n')
    fs.writeFileSync(path.join(componentPath, componentName + '.' + this.extension), component)

    var index = "module.exports = require('./" + componentName + "');"
    fs.writeFileSync(path.join(componentPath, 'index.js'), index)
  },

  classify: function(string) {
    return string.
    split('-').
    map(function(s) { return s.replace(s[0], s[0].toUpperCase()) }).
    join('')
  }
}
