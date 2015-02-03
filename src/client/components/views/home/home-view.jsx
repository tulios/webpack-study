var React = require('react')
var GreetingsWidget = require('app/components/widgets/greetings')
var StandaloneLibrary = require('standalone-library')

var HomeView = React.createClass({
  render: function() {
    return (
      <div className='home-view'>
        <GreetingsWidget />
      </div>
    )
  },

  componentDidMount: function() {
    StandaloneLibrary()
  }
})

module.exports = HomeView
