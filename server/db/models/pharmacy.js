'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pharmacy extends Model {
    static associate(models) {
      // define association here
    }
  }
  Pharmacy.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Pharmacy',
    },
  );
  return Pharmacy;
};
