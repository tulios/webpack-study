/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./routes');

var router = Router.create({
  routes: AppRoutes,
  location: Router.HistoryLocation
});

function getMountNode() {
  return document.body;
}

function routeHandler(Handler, state) {
  React.render(<Handler/>, getMountNode());
}

module.exports = {
  router: router,
  handler: routeHandler
}
