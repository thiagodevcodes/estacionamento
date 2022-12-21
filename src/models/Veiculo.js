const db = require("./db");
const Cliente = require("./Cliente");

const Veiculo = db.sequelize.define("veiculos", {
    marca: {
        type: db.Sequelize.STRING
    },

    modelo: {
        type: db.Sequelize.STRING
    },

    placa: {
        type: db.Sequelize.STRING
    },

    cor: {
        type: db.Sequelize.STRING
    },

    idCliente: {
        type: db.Sequelize.INTEGER
    }
})

Veiculo.belongsTo(Cliente, {foreignKey: 'idCliente', allowNull: false})

module.exports = Veiculo