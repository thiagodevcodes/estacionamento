const Veiculo = require("../models/Veiculo");

module.exports = {
    createVeiculo: async function(veiculo) {
        return await Veiculo.create({ 
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            placa: veiculo.placa,
            cor: veiculo.cor,
            idCliente: veiculo.idcliente
        })
    },

    readVeiculos: async function(req,res) {
        return await Veiculo.findAll()  
    },

    readVeiculo: async function(req, res) {
        return await Veiculo.findOne({
            where: {
                id: req.params.id
            }
        })
    },

    updateVeiculo: async function(req,res) {
        await Veiculo.update({
            marca: req.body.marca,
            modelo: req.body.modelo,
            placa: req.body.placa,
            cor: req.body.cor
         }, {
            where: {
                id: req.params.id
            }
        })
    },

    finallyVeiculo: async function(req,res) {
        return await Veiculo.update({ ativo: false }, {
            where: {
                id: req.params.id
            }
        })
    },

    deleteVeiculo: async function(req,res) {
        return await Veiculo.destroy({
            where: {
                id: req.params.id
            }
        })
    }
}