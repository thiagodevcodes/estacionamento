const Sequelize = require("sequelize");
require("dotenv").config();

let database = process.env.DB_NAME
let username = process.env.DB_USERNAME
let password = process.env.DB_PASS 
let host = process.env.DB_HOST
let port = process.env.DB_PORT
let dialect = process.env. DB_DIALECT

const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`)

module.exports = {
    Sequelize,
    sequelize
}