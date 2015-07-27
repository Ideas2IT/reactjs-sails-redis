/** @jsx React.DOM */

define(['react', 'utils', 'jquery', 'moment'], 
  function(React, Utils, $, Moment) {

  var UsersForm = React.createClass({
    getInitialState: function() {
      this.setDefaultParameters();
      return {       
        errors: {},
        isActive: 1        
      };
    },  
    statics: {
      willTransitionTo: function (transition) {
        if(!Utils.authenticateUser()){
            transition.redirect('home#/');
        }
      }
    },
    getDefaultProps: function() {
      return {
        initialData: {}
      }
    },
    getData: function(){
      io.socket.get('/user', function(result) {
        if (typeof result == 'string')
        result = JSON.parse(result);
        this.setState({data: result});
      }.bind(this));
    },
    componentWillMount: function() { 
        var _this = this;
        this.setState({isShowForm: true});
        if(this.props.params.userId){
          this.isEdit = true;      
          this.setState({isShowForm: false});
        }     
        if(this.isEdit){      
          io.socket.get("/user/"+this.props.params.userId, function(result) {
            result = (typeof result == 'object') ? result : JSON.parse(result);
            _this.props.initialData = result;        
            _this.setState({isShowForm: true, isActive: (result.active === '1')});
          }.bind(this));
        }
    },    
    componentDidMount: function(){
        if(!this.isEdit){
            this.selectUsertype("U");
        }
    },
    componentDidUpdate: function(){
        var usertype = this.props.initialData["usertype"];
        if(usertype != undefined){
            this.selectUsertype(usertype);
        }
        else{
            this.selectUsertype("U");
        }
    },
    isActiveChange: function() {
      this.formData['active'] = !this.state.isActive ? '1' : '0';
      this.setState({isActive: !this.state.isActive});
    },
    render: function() {     
      return (
        <section id="main-content">
          <section className="wrapper margin-top-90">              
          <div className="row">
            <div className="col-sm-12 position-static">
              <section className="panel">
                <header className="panel-heading text-dark-panel">
                  { this.isEdit ? 'Edit User' : 'Add New User'}
                  <div className={"alert-align alert " +this.state.classNames}>{ this.state.message }</div>
                </header>
                { this.state.isShowForm &&
                <div className="panel-body">
                  <form className="form-horizontal bucket-form" method="get">
                    <div className="form-group col-lg-12">
                      <label className="col-sm-2 col-sm-offset-2">{this.formLabel["name"]}</label>
                      <div className="col-sm-6">
                          <input className="form-control text-dark" id="name" type="text" ref="name" 
                            defaultValue={ this.props.initialData["name"]}
                            onChange={this.onChangeFormFields} autoFocus/>
                          <span className="alert-error">{this.state.errors && this.state.errors["name"]}</span>
                      </div>
                    </div> 
                    <div className="form-group col-lg-12">
                      <label className="col-sm-2 col-sm-offset-2">{this.formLabel["active"]}</label>
                      <div className="col-sm-6">
                        <label>                            
                          <input id="active" className="active" ref="active" type="checkbox"
                            defaultValue={this.state.isActive} checked={this.state.isActive} onChange={this.isActiveChange}/> 
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-lg-12">
                      <label className="col-sm-2 col-sm-offset-2">{this.formLabel["email"]}</label>
                        <div className="col-sm-6 ">
                        <input className="form-control text-dark" id="email" type="text" ref="email" disabled={this.isEdit && true}    
                          defaultValue={this.props.initialData["email"]} onChange={this.onChangeFormFields}/>
                      </div>
                      <span className="alert-error col-sm-6 col-sm-offset-4">{this.state.errors && this.state.errors["email"]}</span>
                    </div>
                    { !this.isEdit &&
                    <div className="form-group col-lg-12">
                      <label className="col-sm-2 col-sm-offset-2">{this.formLabel["password"]}</label>
                      <div className="col-sm-6 ">
                        <input className="form-control text-dark" id="password" ref="password" type="password" 
                          aria-invalid="true" onChange={this.onChangeFormFields}/>
                      </div>
                      <span className="alert-error col-sm-6 col-sm-offset-4">{this.state.errors && this.state.errors["password"]}</span>
                    </div>                   
                    }
                    <div className="form-group col-lg-12">
                      <label className="col-sm-2 col-sm-offset-2">{this.formLabel["usertype"]}</label>
                      <div className="col-sm-6">
                        <div>
                            <input type="radio" name="usertype" value="U" /> User
                            <input type="radio" name="usertype" value="S" /> Superuser
                        </div>
                        <span className="alert-error">{this.state.errors && this.state.errors["usertype"]}</span>
                      </div>
                    </div>           
                    <button type="Submit" className="col-xs-2 col-xs-offset-4 btn btn-default submit-btn" value="Submit" onClick={this.handleSubmit}>Submit</button>
                  </form>
                  <button className="col-sm-2 col-sm-offset-1 col-xs-2 col-xs-offset-1 btn btn-default cancel-btn" onClick={this.handleCancelSubmit}>Cancel</button>
                </div>
                }  
              </section>
            </div>
          </div>
        </section>
      </section>
      );
    },
    handleCancelSubmit: function() {
      window.location.href = '#/user';
    },
    handleSubmit: function() {
      var message;
      this.isValid = true;
      this.validateForm();
      if (this.isValid) {       
          if(this.isEdit){
              io.socket.put('/user/'+ this.props.params.userId, this.formData, function(data, jwres){
                  if(jwres.statusCode === 200){
                      window.location.href = "#/user";
                  }
                  else{
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
          else{
              io.socket.post('/user', this.formData, function(data, jwres){
                  if(jwres.statusCode === 201 || jwres.statusCode === 200){
                      window.location.href = "#/user";
                  }
                  else{
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
      } 
      return false;  
    },
    onChangeFormFields: function(event) {
      var targetValue = event.target.value,
          targetId = event.target.id;
      this.validateFormFields(targetValue, targetId);      
    },
    validateForm: function(){
      var _this = this;
      $.each(this.formLabel, function(fieldId, fieldLabel){
        if(_this.refs[fieldId]){
          _this.validateFormFields( _this.refs[fieldId].getDOMNode().value, fieldId);
        }
        else if(fieldId == "usertype"){
          _this.validateFormFields($("input[name='usertype']:checked").val(), fieldId);
        }
      });
      if (this.isValid) {
        if (!this.isEdit) {
          var sessionAuth = JSON.parse(document.cookie);
        }
      }
    },
    validateFormFields: function(targetValue, targetId) {    
      var message = {},
        errors = this.state.errors;     
      if(!targetValue){
        errors[targetId] = this.formLabel[targetId] + ' is mandatory.';
        this.isValid = false;
      } else if(targetId === 'email' && !Utils.validateEmailStr(targetValue)) {
        errors[targetId] = 'Please enter a valid email address.';
        this.isValid = false;
      } else if (targetId === 'name' && targetValue.length < 6) {
        errors[targetId] = this.formLabel[targetId] + ' must be minimum 6 characters.';
      } else if (targetId === 'password' && targetValue.length < 6) {
        errors[targetId] = this.formLabel[targetId] + ' must be minimum 6 characters.';
      } else {
        errors[targetId] = '';        
        if (this.isEdit) {
          if (targetId === 'name' || targetId === 'usertype') {
            this.formData[targetId] = targetValue;
          }
        } else {
          if (targetId === 'active') {
            this.formData[targetId] = $('input[id="'+targetId+'"]').prop('checked') == true ? '1' : '0';
          } else {
            this.formData[targetId] = targetValue;
          }
        }        
      }
      this.setState(errors);
    },
    setDefaultParameters: function(){
      this.isEdit = false;
      this.isUsertypeSet = false;    
      this.formData = {};
      this.formLabel = {
        name: 'Name',
        active: 'Active',
        email: 'Email',
        password: 'Password',
        usertype: 'Type'        
      };      
    },
    selectUsertype: function(usertype){
      if(usertype != undefined && !this.isUsertypeSet){
          $("input[value='"+usertype+"']").prop("checked",true);
          this.isUsertypeSet = true;
      }
    }
  });
  return UsersForm;
});