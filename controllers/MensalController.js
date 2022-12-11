const Mensalista = require("../models/Mensalista")
const Cliente = require("../models/Cliente")
const date = new Date();



module.exports = {
    createMensalista: async function(req, res, cliente) {
        return await Mensalista.create({
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            diaVencimento: req.body.diavencimento,
            dataAdmissao: date.toLocaleDateString(),
            dataRecisao: null,
            idCliente: cliente.id
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

    updateMensalista: async function(req,res, mensalista) {
        await Mensalista.update({ ...req.body }, {
            where: {
                id: req.params.id
            }
        })

        await Cliente.update({
            nome: req.body.nome
        }, {
            where: {
                id: mensalista.idCliente
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
        return await Mensalista.update({ dataRecisao: date.toLocaleDateString() }, {
            where: {
                id: req.params.id
            }
        })
    }
}