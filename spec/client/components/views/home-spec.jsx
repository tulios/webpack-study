var $ = require('jquery')
var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var rewire = require('rewire')
var rewireModule = require('rewire-module')
var HomeView = rewire('app/components/views/home/home-view')

describe('HomeView', function() {
  var view, $node

  rewireModule(HomeView, {
    GreetingsWidget: React.createClass({ render: function() { return (<div className='greetings' />) } })
  })

  beforeEach(function() {
    view = TestUtils.renderIntoDocument(<HomeView />)
    $node = $(view.getDOMNode())
  })

  it('has class "home-view"', function() {
    expect(view.getDOMNode().className).toEqual('home-view')
  })

  it('has a child greetings', function() {
    expect($node.children('.greetings').size()).toEqual(1)
  })

})
