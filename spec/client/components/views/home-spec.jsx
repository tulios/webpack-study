var $ = require('jquery')
var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var rewire = require('rewire')
var stubComponent = require('rewire-module').stubComponent
var HomeView = rewire('app/components/views/home/home-view')

describe('HomeView', function() {
  var view, $node

  stubComponent(HomeView, ['GreetingsWidget'])

  beforeEach(function() {
    view = TestUtils.renderIntoDocument(<HomeView />)
    $node = $(view.getDOMNode())
  })

  it('has class "home-view"', function() {
    expect(view.getDOMNode().className).toEqual('home-view')
  })

  it('has a child greetings', function() {
    expect($node.children('.GreetingsWidget').size()).toEqual(1)
  })

})
