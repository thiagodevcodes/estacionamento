const Mensalista = require("../models/Mensalista")
const Cliente = require("../models/Cliente")
const Vaga = require("../models/Vagas")




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
        const mensalista = await this.readMensalista(id);
        const date = new Date();
        console.log(mensalista.idVaga)
  
        await Vaga.update({
            situacao: false
        }, {
            where: {
                id: mensalista.idVaga
            }
        })

        return await Mensalista.update({ dataRecisao: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` }, {
            where: {
                id: id
            }
        })
    }
}