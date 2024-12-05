'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate({ MedicineTag }) {
      this.hasMany(MedicineTag, { foreignKey: 'tag_id' });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
    },
  );
  return Tag;
};
