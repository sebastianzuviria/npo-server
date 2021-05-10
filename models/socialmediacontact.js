'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Socialmediacontact extends Model {

    static associate(models) {
      Socialmediacontact.belongsTo(models.Organization, {as: 'organization', foreignKey:"organizationId"});

    }
  };
  Socialmediacontact.init({
    facebook:{
      type:DataTypes.STRING,
      validate: {
        isUrl: true
      }
    } ,
    instagram:{
      type:DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    linkedin:{
      type:DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Socialmediacontact',
  });
  return Socialmediacontact;
};