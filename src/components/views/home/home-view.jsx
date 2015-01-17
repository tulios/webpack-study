var React = require('react')
var Greetings = require('../../widgets/greetings')

module.exports = React.createClass({
  render: function() {
    return (
      <div className='home-view'>
        <Greetings />
      </div>
    )
  }
})
