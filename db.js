
/**
 * Dependencies
 */

var Sequelize = module.exports.Sequelize = require("sequelize"),
  requireDir = require('require-dir');

/**
 * Helpers
 */

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Connection
 */

var options;
if (process.env.SQLITE || require('./config').SQLITE) {
  options = {
    dialect: "sqlite",
    storage: "./db.sqlite"
  };
} else {
  options = {};
}

var sequelize = module.exports.sequelize = new Sequelize('vote', 'root', 'sqlpass', options);

/**
 * Load Models
 */

var modelFiles = requireDir('./models');
var models = {};


for(var model in modelFiles) {
  var name = capitaliseFirstLetter(model);
  models[name] = modelFiles[model](sequelize, Sequelize);
  module.exports[name] = models[name];
}

/**
 * Relationships
 */

