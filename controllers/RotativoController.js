const Cliente = require("../models/Cliente");
const Rotativo = require("../models/Rotativo");
const Veiculo = require("../models/Veiculo");
const date = new Date();

module.exports = {
    createRotativo: async function(veiculo, cliente) {
        return await Rotativo.create({ 
            dataAtendimento: date.toLocaleDateString(),
            horaEntrada: date.toLocaleTimeString(),
            horaSaida: null,
            idCliente: cliente.id,
            idVeiculo: veiculo.id
        })
    },

    readRotativos: async function() {
        return await Rotativo.findAll({
            where: {
                horaSaida: null
            }
        })
    },

    readRotativo: async function(id) {
        return await Rotativo.findOne({
            where: {
                id: id    
            }
        })
    },

    updateRotativo: async function(body, rotativo) {
        await Rotativo.update({ 
            horaEntrada: body.horaentrada,
            dataAtendimento: body.dataatendimento
         }, {
            where: {
                id: rotativo.id
            }
        })

        await Cliente.update({
            nome: body.nome
        }, {
            where: {
                id: rotativo.idCliente
            }
        })

        await Veiculo.update({
            marca: body.marca,
            modelo: body.modelo,
            placa: body.placa,
            cor: body.cor
        }, {
            where: {
                id: rotativo.idVeiculo
            }
        })
    },

    deleteRotativo: async function(id) {
        return await Rotativo.destroy({
            where: {
                id: id
            }
        })
    },

    finallyRotativo: async function(id) {       
        await Rotativo.update({ horaSaida: date.toLocaleTimeString() }, {
            where: {
                id: id
            }
        })
    }
}