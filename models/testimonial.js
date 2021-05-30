'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Testimonial.belongsTo(models.User);
    }
  }
  Testimonial.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Testimonial',
      paranoid: true,
    }
  );
  return Testimonial;
};
