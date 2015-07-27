/** @jsx React.DOM */

define(['react', 'react-router', 'jquery', 'utils', 'moment', 'jquery.timeago'], 
  function(React, Router, $, Utils, Moment) {  
  var Link = Router.Link;

  var UsersList = React.createClass({
    getInitialState: function() {
      return {};
    },
    statics: {
      willTransitionTo: function (transition) {
        if(!Utils.authenticateUser()){
            transition.redirect('home#/');
        }
      }
    },
    getData: function(){
      io.socket.get('/user', function(result) {
        this.setState({data: result});
      }.bind(this));
    },
    componentWillMount: function() {
        var _this = this;
        _this.getData();
    },
    componentDidMount: function() {
      var self = this;
      io.socket.on('user', function whenMessageRecevied(message) {
        if (self.isMounted()) {
          self.getData();
        }
      });
    },
    render: function() {    
      return (
        <div className="usersList">
          <section id="main-content">
            <section className="wrapper margin-top-90">
                <div className="row">            
                    <div className="col-sm-12">
                        <section className="panel">
                            <header className="panel-heading text-dark-panel">
                                Users
                              <span className="tools pull-right">
                              <div className="clearfix">
                              <div className="btn-group">
                                <Link to="UserForm">
                                  <button className="btn btn-primary">
                                      Add New <i className="fa fa-plus"></i>
                                  </button>
                                </Link>
                              </div>
                            </div>
                            </span>
                            </header>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                      <UserHead/>
                                    </thead>
                                    {
                                      this.state.data &&
                                      <UserBodyContent userData={this.state.data} />
                                    }
                                </table>
                            </div>
                        </section>
                    </div>
                </div>         
            </section>
        </section>
        </div>
        );
      }
    }); //UsersList
    
    var UserHead = React.createClass({
      render: function() {
        return (      
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Active</th>
            <th className="text-center">Email</th>
            <th className="text-center">Type</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Remove</th>
          </tr>
        );
      }
    });

    var UserBodyContent = React.createClass({
      handleDelete: function(userId) {
        if (confirm('Are you sure want to remove this user record?')) {          
            io.socket.delete('/user/'+ userId, function(data, jwres){
                if(jwres.statusCode == 200){
                    window.location.href = "#/user";
                }
                else{
                    var message;
                    if(jwres.statusCode == 500){
                        message = jwres.error.raw.message;
                    }
                    else{
                        message = jwres.error.summary;
                    }
                    this.setState({status: jwres.statusCode, classNames: 'alert-error', message: message});
                }
            }.bind(this));
        }  
      },
      render: function() {
        var renderCont = [],
            _this = this;       
          this.props.userData.map(function (user, index) {
            renderCont.push(
              <tr>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.active}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.usertype}</td>
                <td className="text-center">
                  <a className="view" href={"#/user/" + user.userid} >
                    <i className="fa fa-pencil-square-o"></i>
                  </a>
                </td>
                <td className="text-center">
                  <a className="delete" onClick={_this.handleDelete.bind(_this, user.userid)} href="javascript:;">
                    <i className="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            );
          });  
          return (
            <tbody className="myclss table table-striped">{renderCont}</tbody>
          );       
      }
  });
return UsersList;
});
