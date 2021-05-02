"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {}
  Organization.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      address: DataTypes.STRING,
      welcomeText: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Organization",
    }
  );
  return Organization;
};
