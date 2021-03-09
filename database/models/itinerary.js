"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Itinerary.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Itinerary",
    }
  );
  return Itinerary;
};
