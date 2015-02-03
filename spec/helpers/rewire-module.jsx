var React = require('react/addons')

var rewireModule = function(rewiredModule, varValues) {
  var rewiredReverts = []

  beforeEach(function() {
    var key, value, revert
    for (key in varValues) {
      if (varValues.hasOwnProperty(key)) {
        value = varValues[key]
        revert = rewiredModule.__set__(key, value)
        rewiredReverts.push(revert)
      }
    }
  })

  afterEach(function() {
    rewiredReverts.forEach(function(revert) {
      revert()
    })
  })

  return rewiredModule
}

var noopComponent = function(className) {
  return React.createClass({
    render: function() { return (<div className={className} />) }
  })
}

var stubComponent = function(rewiredModule, componentNames) {
  var rewiredComponents = {}
  componentNames.forEach(function(name){
    rewiredComponents[name] = noopComponent(name)
  })

  return rewireModule(rewiredModule, rewiredComponents)
}

module.exports = {
  rewireModule: rewireModule,
  noopComponent: noopComponent,
  stubComponent: stubComponent
}
