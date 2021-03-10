"use strict";

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {}
  );
  Trip.associate = function (models) {
    // associations can be defined here
    Trip.hasMany(models.Itinerary, {
      foreignKey: "fk_tripid",
      sourceKey: "id",
    });
    Trip.belongsTo(models.User, {
      foreignKey: "fk_organizerid",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Trip;
};
