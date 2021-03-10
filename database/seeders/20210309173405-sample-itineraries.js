"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Itineraries", [
      {
        name: "Day1 - City Museum",
        description: "Will spend all day in city museum",
        date: new Date(),
        fk_tripid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Day2 - City Park",
        description: "Will spend all day in city park",
        date: new Date(),
        fk_tripid: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Itineraries", null, {});
  },
};
