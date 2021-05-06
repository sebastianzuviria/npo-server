'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Socialmediacontact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      references: {
        model: Organization,
        key: 'id'
      }
  }
  }, {
    sequelize,
    modelName: 'Socialmediacontact',
  });
  return Socialmediacontact;
};