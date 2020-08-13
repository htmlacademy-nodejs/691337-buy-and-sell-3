'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class Offer extends Model {}
  Offer.init({
    'offer_id': {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    'offer_title': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'created_date': {
      type: DataTypes.DATE,
      allowNull: true,
    },
    'picture_name': {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    'price': {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    'offer_type': {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    'description_text': {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Offer;
};
