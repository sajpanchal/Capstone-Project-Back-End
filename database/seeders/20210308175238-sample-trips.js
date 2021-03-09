'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert(
        "Trips",
        [
          {
            name: "My day trip1",
            description: "This is going to be my first day trip",
            source: "Kitchener",
            destination: "Toronto",
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Trip2 to Miami",
            description: "This is going to be my trip to miami",
            source: "New York",
            destination: "Miami",
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Trips", null, {});
  }
};
