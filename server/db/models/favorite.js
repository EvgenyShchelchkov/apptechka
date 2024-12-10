'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User, MedicineInstance }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(MedicineInstance, { foreignKey: 'medicine_instance_id' });
    }
  }
  Favorite.init(
    {
      user_id: DataTypes.INTEGER,
      medicine_instance_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favorite',
    },
  );
  return Favorite;
};
