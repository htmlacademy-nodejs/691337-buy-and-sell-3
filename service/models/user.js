'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init({
    'user_id': {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    'first_name': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'last_name': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'email': {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    'pass': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'avatar_name': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return User;
};