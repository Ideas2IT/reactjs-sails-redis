/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#/documentation/concepts/Logging
 */

var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    winston = require('winston');

var filename = path.join(__dirname, 'application.log');

//
// Remove the file, ignoring any errors
//
try { fs.unlinkSync(filename); }
catch (ex) { }


//
// Create a new winston logger instance with two tranports: Console, and File
//
//
var customLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ prettyPrint: false }),
    new (winston.transports.File)({ 
      level: 'info',
      filename: filename,
      prettyPrint: true,      
      silent: false,
      colorize: true,
      timestamp: function() { 
        return moment().format('YYYY-MM-DD HH:mm'); 
      },      
      maxsize: 40000,
      maxFiles: 10,      
      json: false,
      formatter: function(options) {        
        // Return string will be passed to logger.
        var message = (undefined !== options.message ? (options.message).replace(
  /\u001b(?:\[\??(?:\d\;*)*[A-HJKSTfminsulh])?/g, '') : '');
        return '['+ options.timestamp() +'] ['+ options.level.toUpperCase() +'] '+ message +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/
  level: 'info',
  custom: customLogger
};