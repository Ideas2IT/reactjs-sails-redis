requirejs.config({
  paths: {
    'react': '/bower_components/react/react-with-addons',
    'jquery': '/js/dependencies/lib/js/lib/jquery',
    'jquery.timeago': '/bower_components/jquery-timeago/jquery.timeago',  
    'showdown': '/bower_components/showdown/compressed/showdown',  
    'bootstrap': '/js/dependencies/lib/bs3/js/bootstrap',
    'jsx': '/bower_components/requirejsx/jsx', //needed if jsx not compiled on server
    'JSXTransformer': '/bower_components/react/JSXTransformer',
    'templates': '/js/templates'
  },
  shim: {
    'JSXTransformer': {
      exports: "JSXTransformer"
    }, 
    'jquery.timeago': ["jquery"]
  }
});

require(['jquery', 'react', 'templates/UsersForm'], 
  function ($, React, UsersForm) {
  $(function whenDomIsReady() {
    var socket = io.connect();
    window.socket = socket;
    React.renderComponent(
      UsersForm({url: '/users/signup'}),
      document.getElementById('UsersForm')
    );
    $('input[type="checkbox"]').change(function(){
      this.value = (this.checked? 1 : 0);
      console.log($('input[type="checkbox"]'));
    });
  });
});