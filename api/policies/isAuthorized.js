/**
 * superUserAuth
 *
 * @module      :: Policy
 * @description :: Policy to check whether authenticated user is super user or not.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 module.exports = function(req, res, next){
 	if(req.session.user && req.session.user.usertype == "S"){
 		return next();
 	}
 	else{
 		req.session.flash = {err: 'You not have permission to access this page'};
 		return res.redirect(req.baseUrl + "/home");
 	}

 };