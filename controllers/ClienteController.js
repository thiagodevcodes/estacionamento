const Cliente = require("../models/Cliente")

module.exports = {
    createCliente: async function(cliente) {
        return await Cliente.create({ 
            nome: cliente.nome,
            tipoCliente: cliente.tipoCliente
        })
    },

    readClientes: async function() {
        return await Cliente.findAll()
    },

    readCliente: async function(id) {
        return await Cliente.findOne({
            where: {
                id: id
            }
        })
    },

    updateCliente: async function(cliente, id) {
        await Cliente.update({ 
            nome: cliente.nome
         }, {
            where: {
                id: id
            }
        })
    },

    deleteCliente: async function(id) {
        return await Cliente.destroy({
            where: {
                id: id
            }
        })
    },
}