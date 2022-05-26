const { Sequelize } = require("sequelize");

module.exports = sequelize = process.env.DATABASE_URL
    ? // Heroku database settings
      new Sequelize(process.env.DATABASE_URL, {
          logging: false,
          dialect: "postgres",
          ssl: true,
          dialectOptions: {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          },
      })
    : // Local development database settings
      new Sequelize("postgres://localhost/RoboHouse", {
          logging: false,
      });
