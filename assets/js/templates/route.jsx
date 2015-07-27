/** @jsx React.DOM */
define([
  'jquery',
  'react',
  'react-router',
  'templateFiles/app',
  'templateFiles/innerRoute',
  'templateFiles/index',
  'templateFiles/user/userList',
  'templateFiles/user/userForm'
],

function($, React, Router, App, InnerRoute, Index, UserList, UserForm) {

  var DefaultRoute = Router.DefaultRoute;
  var Link = Router.Link;
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="user" path="/user" handler={InnerRoute}>
        <Route name="UserList" path="all" handler={UserList}/>
        <Route name="UserForm" path="new" handler={UserForm}/>
        <Route name="UserEdit" path=":userId" handler={UserForm}/>
        <DefaultRoute handler={UserList}/>
      </Route>
      <DefaultRoute handler={Index}/>
    </Route>
  );
  Router.run(routes, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body);
  });
});
