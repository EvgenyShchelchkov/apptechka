'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedKit extends Model {
    static associate({ User, MedicineInstance }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(MedicineInstance, { foreignKey: 'med_kit_id' });
    }
  }
  MedKit.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MedKit',
    },
  );
  return MedKit;
};
