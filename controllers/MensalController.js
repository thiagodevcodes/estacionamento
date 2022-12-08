const Mensalista = require("../models/Mensalista")

module.exports = {
    createMensalista: async function(req, res) {
        return await Mensalista.create({ 
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            diaVencimento: req.body.diavencimento,
            idCliente: req.body.idcliente
        })
    },

    readMensalistas: async function(req,res) {
        return await Mensalista.findAll()
    },

    readMensalista: async function(req,res) {
        return await Mensalista.findOne({
            where: {
                id: req.params.id
            }
        })
    },

    updateMensalista: async function(req,res) {
        return await Mensalista.update({ ...req.body }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteMensalista: async function(req,res) {
        return await Mensalista.destroy({
            where: {
                id: req.params.id
            }
        })
    },

    finallyMensalista: async function(req,res) {
        return await Mensalista.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })
    }
}