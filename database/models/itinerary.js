"use strict";

module.exports = (sequelize, DataTypes) => {
  const Itinerary = sequelize.define(
    "Itinerary",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      fk_tripid: DataTypes.INTEGER,
    },
    {}
  );
  Itinerary.associate = function (models) {
    // associations can be defined here
    Itinerary.belongsTo(models.Trip, {
      foreignKey: "fk_tripid",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Itinerary;
};
