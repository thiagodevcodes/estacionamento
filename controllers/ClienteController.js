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

    updateCliente: async function(req) {
        await Cliente.update({ 
            nome: req.body.nome
         }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteCliente: async function(id) {
        return await Ordens.destroy({
            where: {
                id: id
            }
        })
    },
}