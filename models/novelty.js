'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novelty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Novelty.belongsTo(models.Category, {as: 'category', foreignKey:"categoryId"});
    }
  };
  Novelty.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Novelty',
  });
  return Novelty;
};