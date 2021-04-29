'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {}
  Contact.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      message: DataTypes.STRING
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Contacts'
    }
  );
  return Contact;
};
