const { Sequelize } = require('sequelize');
require('dotenv').config();

// Log credentials separately, outside of Sequelize constructor
console.log(process.env.DB_USER, process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
