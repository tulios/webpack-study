var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var GreetingsWidget = require('app/components/widgets/greetings')

describe('GreetingsWidget', function() {
  var widget

  beforeEach(function() {
    widget = TestUtils.renderIntoDocument(<GreetingsWidget />)
  })

  it('contains "Greetings!" as content', function() {
    expect(widget.getDOMNode().textContent).toEqual('Greetings!')
  })

  it('has class "greetings"', function() {
    expect(widget.getDOMNode().className).toEqual('greetings')
  })

})
