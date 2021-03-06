require("dotenv").config();
const pkg = require("../../package.json");
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${pkg.name}-dev`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${pkg.name}`,
    host: DB_HOST,
    dialect: "postgres",
  },
};
