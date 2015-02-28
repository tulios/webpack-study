/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var HomeView = require('app/components/views/home');

var AppRoutes = (
  <Router.Route handler={HomeView} path='/' />
);

module.exports = AppRoutes;
