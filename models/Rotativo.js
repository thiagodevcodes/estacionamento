const db = require("./db");
const Cliente = require("./Cliente");
const Veiculo = require("./Veiculo");
const Vagas = require("./Vagas");

const Rotativo = db.sequelize.define("rotativos", {
    dataAtendimento: {
        type: db.Sequelize.DATEONLY
    },

    horaEntrada: {
        type: db.Sequelize.TIME
    },

    horaSaida: {
        type: db.Sequelize.TIME
    },

    idCliente: {
        type: db.Sequelize.INTEGER
    },

    idVeiculo: {
        type: db.Sequelize.INTEGER
    },

    idVaga: {
        type: db.Sequelize.INTEGER
    }
})

Rotativo.belongsTo(Cliente, {foreignKey: 'idCliente', allowNull: false})
Rotativo.belongsTo(Veiculo, {foreignKey: 'idVeiculo', allowNull: false})

module.exports = Rotativo