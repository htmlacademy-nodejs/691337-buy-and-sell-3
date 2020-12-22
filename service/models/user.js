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
    'user_name': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'email': {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    'password': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'avatar': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'refresh': {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return User;
};
