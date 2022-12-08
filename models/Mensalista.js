const db = require("./db");
const Cliente = require("./Cliente");

const Mensalista = db.sequelize.define("mensalistas", {
    cpf: {
        type: db.Sequelize.STRING
    },

    telefone: {
        type: db.Sequelize.STRING
    },

    email: {
        type: db.Sequelize.STRING
    },

    diaVencimento: {
        type: db.Sequelize.INTEGER
    },

    idCliente: {
        type: db.Sequelize.INTEGER
    }
})

Mensalista.belongsTo(Cliente, {foreignKey: 'idCliente', allowNull: false})

module.exports = Mensalista