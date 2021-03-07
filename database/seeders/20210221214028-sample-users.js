const bcryptjs = require("bcryptjs");
const { BCRYPT_WORK_FACTOR } = require("../../middleware/auth");

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
          password: await bcryptjs.hash("password", BCRYPT_WORK_FACTOR),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "David",
          lastName: "Winter",
          email: "davidwinter@email.com",
          username: "davidwinter",
          password: await bcryptjs.hash("password", BCRYPT_WORK_FACTOR),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Charlie",
          lastName: "Doe",
          email: "charliedow@email.com",
          username: "charliedoe",
          password: await bcryptjs.hash("password", BCRYPT_WORK_FACTOR),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alan",
          lastName: "Harper",
          email: "alanharper@email.com",
          username: "alanharper",
          password: await bcryptjs.hash("password", BCRYPT_WORK_FACTOR),
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
