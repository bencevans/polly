
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
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    passwordHash:{
      type: Sequelize.STRING,
      allowNull: true
    }
  });
};
