'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User, {as: 'user'});
    }
  };
  Activity.init({
    content: DataTypes.TEXT('long'),
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Activity',
  });
  return Activity;
};