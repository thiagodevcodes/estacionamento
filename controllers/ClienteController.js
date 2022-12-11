const Cliente = require("../models/Cliente")

module.exports = {
    createCliente: async function(cliente) {
        const client = await Cliente.create({ 
            nome: cliente.nome,
            tipoCliente: cliente.tipoCliente
        })
        return client
    },

    readClientes: async function(req, res) {
        return await Cliente.findAll()
    },

    readCliente: async function(id) {
        return await Cliente.findOne({
            where: {
                id: id
            }
        })
    },

    updateCliente: async function(req,res) {
        await Cliente.update({ 
            nome: req.body.nome
         }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteCliente: async function(req,res) {
        return await Ordens.destroy({
            where: {
                id: req.params.id
            }
        })
    },

    finallyCliente: async function(req,res) {
        return await Cliente.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })
    }
}