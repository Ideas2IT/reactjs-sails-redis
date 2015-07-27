var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var async = require('async');

var passwordHash = require('password-hash');


var redis = require('redis');
var redisConfig = require('./connections.js').connections.redisdbServer;
//set-up a redis client
redisClient = redis.createClient(redisConfig.port, redisConfig.host);
var Scripto = require('redis-scripto');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    username: 'email',
    password: 'password'
  },
  function(email, password, done) {
  var scriptManager = new Scripto(redisClient);
  password = passwordHash.generate(password);
  scriptManager.run('scriptloginvalidation', [], [ email, password], function(err, result) {
    var user = JSON.parse(result);
    if (err || (user.email !== email)) { 
      console.log("Error : " + err );
      return done('Invalid username or password');
    }
    return done(null, email, user, { message: 'Logged in successfully'});
  });

  }
));
