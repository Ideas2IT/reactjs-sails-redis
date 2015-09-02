/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passwordHash = require('password-hash');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    
    new: function(req, res) {
        if(req.session.authenticated != undefined && req.session.authenticated){
           return res.redirect('/home#/');
        } else{
           req.session.destroy();
           return res.view('login');
        }
    },

    login: function(req, res) {     
        var loggedInUser = {};
        if(req.session.authenticated == undefined && req.body == undefined){
            return res.view('login');
        }else if(req.session.authenticated != undefined && req.session.authenticated){
            return res.redirect('/home#/');
        }
        User.findOne({ 'email': req.body.email} , function (err, user) {
            if(user){
                if (!passwordHash.verify(req.body.password, user.password)) {
                  console.log('Login failed');
                  req.session.flash = { err: 'Invalid email and password combination.'};
                  return res.view('login');
                }
                req.session.authenticated = true;
                delete user.password;
                req.session.user = user;
                res.redirect('/home#/');
            }else{
                req.session.flash = { err: 'Login failed, Please contact admin.'};
                return res.view('login');
            }            
        });
    },

    logout: function(req, res) {
        req.session.authenticated = false;
        req.session.destroy();
        req.logout();
        res.redirect('/');
    }
};
