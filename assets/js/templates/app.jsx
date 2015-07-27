/** @jsx React.DOM */

define(['jquery','react','react-router', 'utils'], function($, React,Router, Utils) {

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  componentWillMount: function() {    
    var sessionAuth = JSON.parse(document.cookie);
    if(sessionAuth.user){
      this.setState({userType: sessionAuth.user.usertype, name: sessionAuth.user.name});
    }else{
      window.location.href = "/login"
    }    
  },
  render: function () {
    return (
      <div>
      <div className="container-fluid" style={{ height: '80px'}}>
      <header className="header fixed-top">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="fa fa-bar"></span>
                <span className="fa fa-bar"></span>
                <span className="fa fa-bar"></span>
            </button>
            <div className="brand">
                <a href="/home#/" className="logo">
                    <div className="logo-text">Sails ReactJS</div>
                </a>
                <a className="i2i-link" target="_blank" href="http://ideas2it.com" >
                    <span>Powered by Ideas2It</span>
                </a>
            </div>
            <div className="horizontal-menu navbar-collapse collapse full-width">
              <ul className="nav navbar-nav">
                { this.state.userType && this.state.userType === "S" && 
                  <li id="user"><Link to="user">Users</Link></li>
                } 
              </ul>              
            </div>
            <div className="top-nav ">
                <ul className="nav pull-right top-menu">
                    <li className="dropdown">
                        <a data-toggle="dropdown" className="dropdown-toggle" href="/logout">
                            <img alt="" src="../images/avatar_small.jpg"></img>
                            <span className="username">{this.state.name}</span>
                            <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu extended logout">
                            <div className="log-arrow-up"></div>
                            <li><a href="/logout"><i className="fa fa-key"></i> Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>      
      </header>
      </div>
      <div className="container-fluid">
        {/* this is the important part */}
        <RouteHandler {...this.props}/>
      </div>
      </div>
  );
  }
});
return App;
});
