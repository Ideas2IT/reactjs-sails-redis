var redis = require('redis');
var redisConfig = require('./connections.js').connections.redisdbServer;
//set-up a redis client
redisClient = redis.createClient(redisConfig.port, redisConfig.host);
var Scripto = require('redis-scripto');

module.exports.init = function (cb){
    var scriptManager = new Scripto(redisClient);
    return scriptManager;
};
