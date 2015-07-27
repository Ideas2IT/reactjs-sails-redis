/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var passwordHash = require('password-hash');

module.exports = {
    autoPK: false,
    attributes: {
        email: {
            type: 'email',
            index: true,
            required: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        name: {
            type: 'string',
            minLength: 6,
            required: true
        },
        active: {
            type: 'binary',
            required: true
        },
        usertype: {
            type: 'string',
            required: true
        },
        userid: {
            type: 'integer',
            autoIncrement:true,
            primaryKey: true
        }
    },
    beforeCreate: function(user, cb) {      
      user.password = passwordHash.generate(user.password);
      cb();
    }
};