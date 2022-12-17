const db = require("./db");

const Vagas = db.sequelize.define("vagas", {
    situacao: {
        type: db.Sequelize.BOOLEAN
    }
})

module.exports = Vagas