const Sequelize = require("sequelize");

let database = 'carros'
let username = 'thiago'
let password = '34616096' 

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize,
    sequelize
}