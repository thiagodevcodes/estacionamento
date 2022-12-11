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

    readRotativos: async function(req,res) {
        return await Rotativo.findAll({
            where: {
                horaSaida: null
            }
        })
    },

    readRotativo: async function(req,res) {
        return await Rotativo.findOne({
            where: {
                id: req.params.id    
            }
        })
    },

    updateRotativo: async function(req, res, rotativo) {
        await Rotativo.update({ 
            horaEntrada: req.body.horaentrada,
            dataAtendimento: req.body.dataatendimento
         }, {
            where: {
                id: req.params.id
            }
        })

        await Cliente.update({
            nome: req.body.nome
        }, {
            where: {
                id: rotativo.idCliente
            }
        })

        await Veiculo.update({
            marca: req.body.marca,
            modelo: req.body.modelo,
            placa: req.body.placa,
            cor: req.body.cor
        }, {
            where: {
                id: rotativo.idVeiculo
            }
        })
    },

    deleteRotativo: async function(req,res) {
        return await Rotativo.destroy({
            where: {
                id: req.params.id
            }
        })
    },

    finallyRotativo: async function(req,res) {       
        await Rotativo.update({ horaSaida: date.toLocaleTimeString() }, {
            where: {
                id: req.params.id
            }
        })
    }
}