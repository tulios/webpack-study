var React = require('react');
var Router = require('react-router');

var HomeView = require('./components/views/home')

var routes = (
  <Router.Route handler={HomeView} path='/' />
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
