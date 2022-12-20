const Mensalista = require("../models/Mensalista")

module.exports = {
    createMensalista: async function(req, cliente, vaga) {
        const date = new Date();
        return await Mensalista.create({
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            diaVencimento: req.body.diavencimento,
            dataAdmissao: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            dataRecisao: null,
            idCliente: cliente.id,
            idVaga: vaga.id
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

    updateMensalista: async function(mensalista, id) {
        await Mensalista.update({
            cpf: mensalista.cpf,
            email: mensalista.email,
            telefone: mensalista.telefone,
            diaVencimento: mensalista.diaVencimento,
            dataAdmissao: mensalista.dataAdmissao,
            dataRecisao: mensalista.dataRecisao,
            idVaga: mensalista.idVaga
        }, {
            where: {
                id: id
            }
        })
    },

    deleteMensalista: async function(id) {
        return await Mensalista.destroy({
            where: {
                id: id
            }
        })
    }
}