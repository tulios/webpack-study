var React = require('react')
var StandaloneLibrary = require('standalone-library')
var Greetings = require('../../widgets/greetings')

module.exports = React.createClass({
  render: function() {
    return (
      <div className='home-view'>
        <Greetings />
      </div>
    )
  },

  componentDidMount: function() {
    StandaloneLibrary();
  }
})
