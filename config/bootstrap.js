/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var fixtures = require('sails-fixtures');

module.exports.bootstrap = function(cb) {

    User.count().exec(function(err, count) {
    if(err) {
      sails.log.error('User data exist.');
      return cb(err);
    }    
    if(count > 0) return cb();
      // Start to create super admin after wipe the data source.
      sails.log.info('Data set-up initialized...');
    fixtures.init({
      'dir':'./resource/json/',
      'pattern':'*.json' //
    }, function(){
      sails.log.info("Data set-up completed.");
      cb();
    });
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();
};
