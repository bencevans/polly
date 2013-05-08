
/**
 * Dependencies
 */

var _ = require('underscore');

console.log('WARNING: You are using config.example.js');

module.exports = require('./config.example');

_.each(process.env, function(val, key) {
  if(module.exports[key])
    module.exports[key] = val;
});