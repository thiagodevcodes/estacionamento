const Mensalista = require("../models/Mensalista")
const Cliente = require("../models/Cliente")
const date = new Date();



module.exports = {
    createMensalista: async function(req, cliente) {
        return await Mensalista.create({
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            diaVencimento: req.body.diavencimento,
            dataAdmissao: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            dataRecisao: null,
            idCliente: cliente.id
        })
    },

    readMensalistas: async function() {
        return await Mensalista.findAll({
            where: {
                dataRecisao: null
            }
        })
    },

    readMensalista: async function(id) {
        return await Mensalista.findOne({
            where: {
                id: id
            }
        })
    },

    updateMensalista: async function(req, mensalista) {
        await Mensalista.update({
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            diaVencimento: req.body.diavencimento,
            dataAdmissao: req.body.dataadmissao
        }, {
            where: {
                id: mensalista.id
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

    deleteMensalista: async function(id) {
        return await Mensalista.destroy({
            where: {
                id: id
            }
        })
    },

    finallyMensalista: async function(id) {
        return await Mensalista.update({ dataRecisao: date.toLocaleDateString() }, {
            where: {
                id: id
            }
        })
    }
}