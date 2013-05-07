
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Poll', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    keywords: {
      type: Sequelize.STRING,
      allowNull: true
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });
};
