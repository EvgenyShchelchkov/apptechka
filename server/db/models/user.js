'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ MedKit, Favorite }) {
      this.hasMany(MedKit, { foreignKey: 'user_id' });
      this.hasMany(Favorite, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
