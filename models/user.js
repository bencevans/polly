
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    twitterId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });
};
