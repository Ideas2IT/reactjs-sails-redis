/** @jsx React.DOM */

define(['react', 'utils', 'jquery', 'moment'], 
  function(React, Utils, $, Moment) {

  var UsersForm = React.createClass({
    getInitialState: function() {
      return {};
    },  
    getDefaultProps: function() {
      return {
        initialData: {}
      }
    },
    render: function() {     
      return (
        <section id="main-content">
          <section className="wrapper margin-top-90">              
          <div className="row">
            <div className="col-sm-12 position-static text-center">
              <img alt="" src="../images/react-sails-redis.png"></img>
            </div>
          </div>
        </section>
      </section>
      );
    }
  });
  return UsersForm;
});