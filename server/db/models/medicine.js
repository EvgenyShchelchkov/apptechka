'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate({ MedicineInstance, MedKit }) {
      this.hasMany(MedicineInstance, { foreignKey: 'medicine_id' });
    }
  }
  Medicine.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      code: DataTypes.TEXT,
      img: DataTypes.TEXT,
      presciption: DataTypes.STRING,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Medicine',
    },
  );
  return Medicine;
};
