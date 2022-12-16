const Sequelize = require("sequelize");
require("dotenv").config();

let database = process.env.DB_NAME
let username = process.env.DB_USERNAME
let password = process.env.DB_PASS 

const sequelize = new Sequelize(database, username, password, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = {
    Sequelize,
    sequelize
}