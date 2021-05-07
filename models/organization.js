'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {

    static associate(models) {
      Organization.hasOne(model.Socialmediacontact, {as: 'Social media', foreignKey:"organizationId"});
    }
  };
  Organization.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    welcomeText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};