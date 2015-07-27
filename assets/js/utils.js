define([], function () {
  'use strict';
  
  var utils = {
    uuid: function () {
      /*jshint bitwise:false */
      var i, random;
      var uuid = '';

      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        } uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
          .toString(16);
      } return uuid;
    },
    pluralize: function (count, word) {
      return count === 1 ? word : word + 's';
    },
    checkMinimumChar: function(minimumChar, actualCharLength) {
      var isValid = false;
      if(actualCharLength < minimumChar){
        isValid = true;
      }
      return isValid;
    },

    validateEmailStr: function(emailStr) {
      var emailExpr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      var isValid = false;
      if (emailExpr.test(emailStr) === true) {
          isValid = true;
      }
      return isValid;
    },
    validateIsNumber: function(number) {
      if (!isNaN(number)) {
        return true;
      } else {
        return false;
      }
    },
    //---------Blur Validation Ends-------//
    authenticateUser : function() {
        var userSessionAuth = JSON.parse(document.cookie);
        if(userSessionAuth.user && userSessionAuth.user.usertype == "S"){
            return true;
        }
        else{
            // alert("Your not having admin permission to access this page");
             window.location.href = window.location.origin + "/home";
        }
    },
  
    ALL_TODOS: 'all',

    ACTIVE_TODOS: 'active',

    COMPLETED_TODOS: 'completed'
  };  
  return utils;
});