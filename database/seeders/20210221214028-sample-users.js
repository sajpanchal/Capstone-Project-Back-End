"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Snow",
          email: "johnsnow@email.com",
          username: "johnsnow",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "David",
          lastName: "Winter",
          email: "davidwinter@email.com",
          username: "davidwinter",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Charlie",
          lastName: "Doe",
          email: "charliedow@email.com",
          username: "charliedoe",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alan",
          lastName: "Harper",
          email: "alanharper@email.com",
          username: "alanharper",
          password: "password",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
