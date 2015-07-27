/** @jsx React.DOM */

define(['jquery','react','react-router'], function($, React,Router) {

	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;


	var nestedApp = React.createClass({
	  render: function () {
	    return (
	      <div>
	        {/* this is the important part */}
	        <RouteHandler {...this.props}/>
	      </div>
	  );
	  }
	});
  return nestedApp;
});