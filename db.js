
/**
 * Dependencies
 */

var Sequelize = module.exports.Sequelize = require("sequelize"),
  requireDir = require('require-dir'),
  debug = require('debug')('sql'),
  config = require('./config');

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
if (config.SQL_TYPE == 'sqlite') {
  options = {
    dialect: 'sqlite',
    storage: config.SQL_SQLITE_PATH,
    logging: debug
  };
} else {
  options = {
    logging: debug
  };
}

var sequelize = module.exports.sequelize = new Sequelize(config.SQL_DATABASE, config.SQL_USERNAME, config.SQL_PASSWORD, options);

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

models.Poll.hasMany(models.Vote);
models.Vote.belongsTo(models.Poll);