'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicineInstance extends Model {
    static associate({ Medicine, MedKit }) {
      this.belongsTo(Medicine, { foreignKey: 'medicine_id' });
      this.belongsTo(MedKit, { foreignKey: 'med_kit_id' });
    }
  }
  MedicineInstance.init(
    {
      quantity: DataTypes.INTEGER,
      expiration: DataTypes.DATE,
      medicine_id: DataTypes.INTEGER,
      med_kit_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MedicineInstance',
    },
  );
  return MedicineInstance;
};
