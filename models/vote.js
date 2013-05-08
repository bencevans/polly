
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Vote', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    response: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
};
