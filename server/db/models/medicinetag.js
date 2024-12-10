'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicineTag extends Model {
    static associate({ Tag, Medicine }) {
      this.belongsTo(Tag, { foreignKey: 'tag_id' });
      this.belongsTo(Medicine, { foreignKey: 'medicine_id' });
    }
  }
  MedicineTag.init(
    {
      medicine_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MedicineTag',
    },
  );
  return MedicineTag;
};
